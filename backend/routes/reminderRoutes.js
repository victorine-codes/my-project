import express from 'express';
import { createReminderHandler, listReminders, updateReminderHandler, deleteReminderHandler } from '../controllers/reminderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createReminderHandler);
router.get('/', authenticate, listReminders);
router.put('/:id', authenticate, updateReminderHandler);
router.delete('/:id', authenticate, deleteReminderHandler);

export default router;
