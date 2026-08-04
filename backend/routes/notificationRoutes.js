import express from 'express';
import { listNotifications, createNotificationHandler } from '../controllers/notificationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, listNotifications);
router.post('/', authenticate, createNotificationHandler);

export default router;
