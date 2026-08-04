import { createUser, findUserByEmail, findUserById, comparePassword, generateToken, setResetToken, getUserByResetToken, updatePassword, updateUserProfile, listUsers, deleteUser } from '../models/authModel.js';
import { logger } from '../utils/logger.js';
import crypto from 'crypto';

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, gender, dateOfBirth, bloodGroup, address } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '').trim();

    if (!normalizedEmail || !normalizedPassword || !fullName) {
      return res.status(400).json({ success: false, message: 'Please provide your full name, email, and password.' });
    }

    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const userId = await createUser({ fullName: String(fullName).trim(), email: normalizedEmail, password: normalizedPassword, phone: String(phone || '').trim(), gender: String(gender || '').trim(), dateOfBirth, bloodGroup, address });
    logger.info(`User registered: ${normalizedEmail}`);
    res.status(201).json({ success: true, message: 'Registration successful.', userId });
  } catch (error) {
    logger.error(`Register failed: ${error.message}`);
    res.status(500).json({ success: false, message: error.message || 'Registration failed.' });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '').trim();

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ success: false, message: 'Please provide your email and password.' });
    }

    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isValid = await comparePassword(normalizedPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user.user_id);
    logger.info(`User logged in: ${normalizedEmail}`);
    res.json({ success: true, message: 'Login successful.', token, user: { id: user.user_id, email: user.email, fullName: user.full_name, role: user.role } });
  } catch (error) {
    logger.error(`Login failed: ${error.message}`);
    res.status(500).json({ success: false, message: error.message || 'Login failed.' });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
    await setResetToken(email, token, expiresAt);
    res.json({ success: true, message: 'Password reset token generated.', resetToken: token });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await getUserByResetToken(token);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    await updatePassword(user.user_id, password);
    res.json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    await updateUserProfile(req.user.id, req.body);
    res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    await updateUserProfile(req.params.id, req.body);
    res.json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
