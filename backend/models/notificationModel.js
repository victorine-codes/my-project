import mongoose from 'mongoose';

const createNotificationId = () => new mongoose.Types.ObjectId().toString();

const notificationSchema = new mongoose.Schema({
  notification_id: { type: String, default: createNotificationId, unique: true },
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'sent' },
  sent_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Notification = mongoose.model('Notification', notificationSchema);

export const createNotification = async ({ userId, title, message, status }) => {
  const notification = await Notification.create({ user_id: userId, title, message, status: status || 'sent' });
  return notification.notification_id;
};

export const getNotifications = async (userId) => {
  return Notification.find({ user_id: userId }).sort({ sent_at: -1 }).lean();
};
