const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  seite: {
    type: String,
    required: [true, 'Feature name is required'],
    trim: true,
    maxlength: [200, 'Feature name cannot exceed 200 characters']
  },
  status: {
    type: String,
    enum: ['', 'Wireframe', 'Prod'],
    default: ''
  },
  persovertrieb: {
    type: Boolean,
    default: false
  },
  finanzvertrieb: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  estimatedCompletionDate: {
    type: Date
  },
  actualCompletionDate: {
    type: Date
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature'
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  history: [{
    action: {
      type: String,
      enum: ['created', 'updated', 'status_changed', 'deleted']
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    changes: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
featureSchema.index({ seite: 'text' });
featureSchema.index({ status: 1 });
featureSchema.index({ createdBy: 1 });
featureSchema.index({ createdAt: -1 });

// Virtual for status display
featureSchema.virtual('statusDisplay').get(function() {
  switch(this.status) {
    case 'Prod': return 'Produktiv';
    case 'Wireframe': return 'Wireframe';
    default: return 'Geplant';
  }
});

// Pre-save middleware to track history
featureSchema.pre('save', function(next) {
  if (this.isNew) {
    this.history.push({
      action: 'created',
      performedBy: this.createdBy,
      timestamp: new Date()
    });
  }
  next();
});

// Method to add history entry
featureSchema.methods.addHistoryEntry = function(action, userId, changes = null) {
  this.history.push({
    action,
    performedBy: userId,
    timestamp: new Date(),
    changes
  });
};

module.exports = mongoose.model('Feature', featureSchema);