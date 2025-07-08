const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage (in-memory)
let features = [
  { _id: '1', seite: 'Hierarchiekette', status: 'Prod', persovertrieb: true, finanzvertrieb: true, priority: 'high', description: 'Feature für Hierarchiekette', createdBy: 'admin' },
  { _id: '2', seite: 'Standardgeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false, priority: 'medium', description: '', createdBy: 'admin' },
  { _id: '3', seite: 'Organigramm', status: 'Prod', persovertrieb: true, finanzvertrieb: false, priority: 'medium', description: '', createdBy: 'admin' },
  { _id: '4', seite: 'Landing Page', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false, priority: 'low', description: '', createdBy: 'admin' },
  { _id: '5', seite: 'Dashboard', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false, priority: 'high', description: '', createdBy: 'admin' },
  { _id: '6', seite: 'Bankverbindung', status: '', persovertrieb: true, finanzvertrieb: true, priority: 'medium', description: '', createdBy: 'admin' }
];

let users = [
  {
    _id: 'admin',
    username: 'admin',
    email: 'admin@swisslife.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    department: 'both',
    isActive: true,
    preferences: { theme: 'light', language: 'de' }
  }
];

let nextId = 7;

// Mock JWT token
const mockToken = 'mock-jwt-token-12345';

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@swisslife.com' && password === 'admin123') {
    const user = users.find(u => u.email === email);
    res.json({
      success: true,
      token: mockToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        role: user.role,
        department: user.department,
        preferences: user.preferences
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, password, firstName, lastName, department } = req.body;
  
  const newUser = {
    _id: Date.now().toString(),
    username,
    email,
    firstName,
    lastName,
    role: 'user',
    department: department || 'finanzvertrieb',
    isActive: true,
    preferences: { theme: 'light', language: 'de' }
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    token: mockToken,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      role: newUser.role,
      department: newUser.department,
      preferences: newUser.preferences
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const user = users[0]; // Admin user
  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      department: user.department,
      preferences: user.preferences
    }
  });
});

// Feature routes
app.get('/api/features', (req, res) => {
  const { status, search } = req.query;
  
  let filteredFeatures = features;
  
  if (status && status !== 'all') {
    if (status === 'not-started') {
      filteredFeatures = filteredFeatures.filter(f => f.status === '');
    } else {
      filteredFeatures = filteredFeatures.filter(f => f.status === status);
    }
  }
  
  if (search) {
    filteredFeatures = filteredFeatures.filter(f => 
      f.seite.toLowerCase().includes(search.toLowerCase()) ||
      (f.description && f.description.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  res.json({
    features: filteredFeatures,
    totalPages: 1,
    currentPage: 1,
    totalFeatures: filteredFeatures.length
  });
});

app.get('/api/features/stats/overview', (req, res) => {
  const stats = {
    total: features.length,
    byStatus: {
      Prod: features.filter(f => f.status === 'Prod').length,
      Wireframe: features.filter(f => f.status === 'Wireframe').length,
      planned: features.filter(f => f.status === '').length
    }
  };
  
  res.json(stats);
});

app.post('/api/features', (req, res) => {
  const newFeature = {
    _id: (nextId++).toString(),
    ...req.body,
    createdBy: 'admin'
  };
  
  features.push(newFeature);
  res.status(201).json(newFeature);
});

app.put('/api/features/:id', (req, res) => {
  const featureIndex = features.findIndex(f => f._id === req.params.id);
  
  if (featureIndex === -1) {
    return res.status(404).json({ error: 'Feature not found' });
  }
  
  features[featureIndex] = { ...features[featureIndex], ...req.body };
  res.json(features[featureIndex]);
});

app.delete('/api/features/:id', (req, res) => {
  const featureIndex = features.findIndex(f => f._id === req.params.id);
  
  if (featureIndex === -1) {
    return res.status(404).json({ error: 'Feature not found' });
  }
  
  features.splice(featureIndex, 1);
  res.json({ message: 'Feature deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: 'mock'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log('Login credentials: admin@swisslife.com / admin123');
});