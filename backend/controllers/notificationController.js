import { createNotification, getNotifications } from '../models/notificationModel.js';

export const listNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotifications(req.user.id);
    res.json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

export const createNotificationHandler = async (req, res, next) => {
  try {
    const id = await createNotification({ userId: req.user.id, ...req.body });
    res.status(201).json({ success: true, message: 'Notification created successfully.', notificationId: id });
  } catch (error) {
    next(error);
  }
};
