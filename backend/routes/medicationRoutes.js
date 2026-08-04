import express from 'express';
import { createMedicationHandler, listMedications, getMedication, updateMedicationHandler, deleteMedicationHandler } from '../controllers/medicationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createMedicationHandler);
router.get('/', authenticate, listMedications);
router.get('/:id', authenticate, getMedication);
router.put('/:id', authenticate, updateMedicationHandler);
router.delete('/:id', authenticate, deleteMedicationHandler);

export default router;
