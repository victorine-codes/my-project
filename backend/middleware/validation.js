import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array().map((error) => ({ field: error.path, message: error.msg })) });
    }
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Validation failed.' });
  }
};
