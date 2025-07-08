const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }
    next();
  };
};

const authorizeDepart = (...departments) => {
  return (req, res, next) => {
    if (req.user.role === 'admin' || req.user.department === 'both') {
      return next();
    }
    
    if (!departments.includes(req.user.department)) {
      return res.status(403).json({ 
        error: `User department '${req.user.department}' is not authorized to access this resource` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize, authorizeDepart };