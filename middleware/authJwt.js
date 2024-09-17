const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};
