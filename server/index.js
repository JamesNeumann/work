const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feature-matrix';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Feature Schema
const featureSchema = new mongoose.Schema({
  seite: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Prod', 'Wireframe', ''],
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Feature = mongoose.model('Feature', featureSchema);

// API Routes
app.get('/api/features', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/features', async (req, res) => {
  try {
    const feature = new Feature(req.body);
    await feature.save();
    res.status(201).json(feature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/features/:id', async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/features/:id', async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize database with sample data
app.post('/api/init', async (req, res) => {
  try {
    const count = await Feature.countDocuments();
    if (count === 0) {
      const sampleData = [
        { seite: 'Hierarchiekette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Standardgeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Organigramm', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Umstrukturierung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Werberhierarchie', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'VPa-Suche', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Stammdaten', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Antraggeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Positionswechsel', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Vergütungseinstellungen', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Datenbereitstellung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Geldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Landing Page', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Dashboard', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Bonifikation', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Vier-Augen-Prinzip', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Beförderungserlaubnis', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Anschubfinanzierung – LaP', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – Linearisierung', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – CampusScout', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – Vorschuss', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Bankverbindung', status: '', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Kontosperren', status: '', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Pfändungssperre', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Recruitingbonus', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Bringerbonus', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Unterlage', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Sonderprovision NHB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Notizenseite', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Büro', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Linearisierung', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Vorschuss', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'NBB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'WZB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'BAA', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'BBEX', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Abrechnungsseite', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Archiv', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Wettbewerbsabrechnung', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Kontoansicht', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Ereignisprotokoll', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'CampusScout mit Zusatzfunktion', status: '', persovertrieb: false, finanzvertrieb: true }
      ];
      
      await Feature.insertMany(sampleData);
      res.json({ message: 'Database initialized with sample data' });
    } else {
      res.json({ message: 'Database already contains data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  // In Docker, the build folder is in the same directory as the server
  const buildPath = path.join(__dirname, 'build');
  
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});