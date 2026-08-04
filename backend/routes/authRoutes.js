import express from 'express';
import { body } from 'express-validator';
import { register, login, forgotPassword, resetPassword, getProfile, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], login);

router.post('/forgot-password', [body('email').isEmail().withMessage('Valid email is required'), validateRequest], forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 6 }), validateRequest], resetPassword);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
