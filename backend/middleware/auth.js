import jwt from 'jsonwebtoken';
import { findUserById } from '../models/authModel.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token is required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'curasync-secret');
    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }

    req.user = { id: user.user_id, email: user.email, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message || 'Invalid or expired token.' });
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
  }

  next();
};
