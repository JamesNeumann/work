const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feature = require('../models/Feature');
const { protect, authorize } = require('../middleware/auth');

// Validation middleware
const validateFeature = [
  body('seite').trim().notEmpty().withMessage('Feature name is required'),
  body('status').optional().isIn(['', 'Wireframe', 'Prod']).withMessage('Invalid status'),
  body('persovertrieb').optional().isBoolean().withMessage('Persovertrieb must be boolean'),
  body('finanzvertrieb').optional().isBoolean().withMessage('Finanzvertrieb must be boolean'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description too long')
];

// GET all features with filtering and pagination
router.get('/', protect, async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 50,
      status,
      search,
      persovertrieb,
      finanzvertrieb,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    // Build query filters
    if (status) query.status = status;
    if (persovertrieb !== undefined) query.persovertrieb = persovertrieb === 'true';
    if (finanzvertrieb !== undefined) query.finanzvertrieb = finanzvertrieb === 'true';
    if (search) {
      query.$or = [
        { seite: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    // Execute query with pagination
    const features = await Feature.find(query)
      .populate('createdBy', 'username email')
      .populate('lastModifiedBy', 'username email')
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await Feature.countDocuments(query);

    res.json({
      features,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalFeatures: count
    });
  } catch (error) {
    next(error);
  }
});

// GET single feature by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const feature = await Feature.findById(req.params.id)
      .populate('createdBy', 'username email fullName')
      .populate('lastModifiedBy', 'username email fullName')
      .populate('dependencies', 'seite status')
      .populate('history.performedBy', 'username email');

    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.json(feature);
  } catch (error) {
    next(error);
  }
});

// POST create new feature
router.post('/', protect, validateFeature, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const featureData = {
      ...req.body,
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    };

    const feature = await Feature.create(featureData);
    
    await feature.populate('createdBy', 'username email');

    res.status(201).json(feature);
  } catch (error) {
    next(error);
  }
});

// PUT update feature
router.put('/:id', protect, validateFeature, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    // Track changes for history
    const changes = {};
    Object.keys(req.body).forEach(key => {
      if (feature[key] !== req.body[key]) {
        changes[key] = {
          from: feature[key],
          to: req.body[key]
        };
      }
    });

    // Update feature
    Object.assign(feature, req.body);
    feature.lastModifiedBy = req.user._id;

    // Add history entry
    if (Object.keys(changes).length > 0) {
      feature.addHistoryEntry('updated', req.user._id, changes);
    }

    await feature.save();
    await feature.populate('createdBy lastModifiedBy', 'username email');

    res.json(feature);
  } catch (error) {
    next(error);
  }
});

// DELETE feature (soft delete recommended)
router.delete('/:id', protect, authorize('admin', 'manager'), async (req, res, next) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    // Add deletion to history before removing
    feature.addHistoryEntry('deleted', req.user._id);
    await feature.save();

    await Feature.findByIdAndDelete(req.params.id);

    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// POST bulk import features
router.post('/bulk-import', protect, authorize('admin', 'manager'), async (req, res, next) => {
  try {
    const { features } = req.body;
    
    if (!Array.isArray(features) || features.length === 0) {
      return res.status(400).json({ error: 'Invalid features array' });
    }

    const createdFeatures = await Feature.insertMany(
      features.map(f => ({
        ...f,
        createdBy: req.user._id,
        lastModifiedBy: req.user._id
      }))
    );

    res.status(201).json({
      message: `Successfully imported ${createdFeatures.length} features`,
      features: createdFeatures
    });
  } catch (error) {
    next(error);
  }
});

// GET feature statistics
router.get('/stats/overview', protect, async (req, res, next) => {
  try {
    const stats = await Feature.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const departmentStats = await Feature.aggregate([
      {
        $group: {
          _id: null,
          persovertrieb: { $sum: { $cond: ['$persovertrieb', 1, 0] } },
          finanzvertrieb: { $sum: { $cond: ['$finanzvertrieb', 1, 0] } },
          both: { 
            $sum: { 
              $cond: [
                { $and: ['$persovertrieb', '$finanzvertrieb'] }, 
                1, 
                0
              ] 
            } 
          }
        }
      }
    ]);

    const totalFeatures = await Feature.countDocuments();

    res.json({
      total: totalFeatures,
      byStatus: stats.reduce((acc, curr) => {
        acc[curr._id || 'planned'] = curr.count;
        return acc;
      }, {}),
      byDepartment: departmentStats[0] || { persovertrieb: 0, finanzvertrieb: 0, both: 0 }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;