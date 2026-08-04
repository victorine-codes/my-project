import express from 'express';
import { createAppointmentHandler, listAppointments, updateAppointmentHandler, deleteAppointmentHandler } from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createAppointmentHandler);
router.get('/', authenticate, listAppointments);
router.put('/:id', authenticate, updateAppointmentHandler);
router.delete('/:id', authenticate, deleteAppointmentHandler);

export default router;
