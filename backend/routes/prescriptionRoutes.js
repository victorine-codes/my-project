import express from 'express';
import { createPrescriptionHandler, listPrescriptions, deletePrescriptionHandler } from '../controllers/prescriptionController.js';
import { authenticate } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

router.post('/', authenticate, uploadSingle('file'), createPrescriptionHandler);
router.get('/', authenticate, listPrescriptions);
router.delete('/:id', authenticate, deletePrescriptionHandler);

export default router;
