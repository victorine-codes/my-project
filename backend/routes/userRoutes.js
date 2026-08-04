import express from 'express';
import { getUsers, getUserById, updateUser, deleteUserById } from '../controllers/authController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUserById);

export default router;
