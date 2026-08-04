import express from 'express';
import { createDoctorHandler, listDoctors, getDoctor, updateDoctorHandler, deleteDoctorHandler } from '../controllers/doctorController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, listDoctors);
router.get('/:id', authenticate, getDoctor);
router.post('/', authenticate, authorizeRoles('admin'), createDoctorHandler);
router.put('/:id', authenticate, authorizeRoles('admin'), updateDoctorHandler);
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteDoctorHandler);

export default router;
