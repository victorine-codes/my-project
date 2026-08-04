import express from 'express';
import { createEmergencyHandler, listEmergencyContacts, updateEmergencyHandler, deleteEmergencyHandler } from '../controllers/emergencyController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createEmergencyHandler);
router.get('/', authenticate, listEmergencyContacts);
router.put('/:id', authenticate, updateEmergencyHandler);
router.delete('/:id', authenticate, deleteEmergencyHandler);

export default router;
