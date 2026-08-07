import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createUserId = () => new mongoose.Types.ObjectId().toString();

const userSchema = new mongoose.Schema({
  user_id: { type: String, default: createUserId, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  password: { type: String, required: true },
  gender: { type: String },
  date_of_birth: { type: String },
  address: { type: String },
  profile_picture: { type: String },
  role: { type: String, default: 'user' },
  reset_token: { type: String },
  reset_token_expires: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

export const createUser = async ({ fullName, email, password, phone, gender, dateOfBirth, address }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    full_name: fullName,
    email,
    phone,
    password: hashedPassword,
    gender,
    date_of_birth: dateOfBirth,
    address
  });
  return user.user_id;
};

export const findUserByEmail = async (email) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return User.findOne({ email: normalizedEmail }).lean();
};

export const findUserById = async (userId) => {
  return User.findOne({ user_id: userId }).lean();
};

export const comparePassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET || 'curasync-secret', { expiresIn: '7d' });

export const setResetToken = async (email, token, expiresAt) => {
  const normalizedExpiresAt = expiresAt instanceof Date ? expiresAt : new Date(String(expiresAt).replace(' ', 'T'));
  const result = await User.updateOne({ email }, { $set: { reset_token: token, reset_token_expires: normalizedExpiresAt } });
  return result.modifiedCount;
};

export const getUserByResetToken = async (token) => {
  return User.findOne({ reset_token: token, reset_token_expires: { $gt: new Date() } }).lean();
};

export const updatePassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.updateOne({ user_id: userId }, { $set: { password: hashedPassword, reset_token: null, reset_token_expires: null } });
  return result.modifiedCount;
};

export const updateUserProfile = async (userId, data) => {
  await User.updateOne({ user_id: userId }, { $set: { ...data, updated_at: new Date() } });
};

export const listUsers = async () => {
  return User.find({}).sort({ created_at: -1 }).lean();
};

export const deleteUser = async (userId) => {
  const result = await User.deleteOne({ user_id: userId });
  return result.deletedCount;
};
