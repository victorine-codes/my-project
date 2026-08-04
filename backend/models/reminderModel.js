import mongoose from 'mongoose';

const createReminderId = () => new mongoose.Types.ObjectId().toString();

const reminderSchema = new mongoose.Schema({
  reminder_id: { type: String, default: createReminderId, unique: true },
  medication_id: { type: String, required: true },
  user_id: { type: String, required: true },
  reminder_time: { type: String, required: true },
  reminder_date: { type: String, required: true },
  repeat_days: { type: String, default: '' },
  notification_status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Reminder = mongoose.model('Reminder', reminderSchema);

export const createReminder = async ({ medicationId, userId, reminderTime, reminderDate, repeatDays, notificationStatus }) => {
  const reminder = await Reminder.create({
    medication_id: medicationId,
    user_id: userId,
    reminder_time: reminderTime,
    reminder_date: reminderDate,
    repeat_days: repeatDays || '',
    notification_status: notificationStatus || 'pending'
  });
  return reminder.reminder_id;
};

export const getReminders = async (userId) => {
  return Reminder.find({ user_id: userId }).sort({ reminder_date: 1, reminder_time: 1 }).lean();
};

export const updateReminder = async (id, userId, data) => {
  await Reminder.updateOne({ reminder_id: id, user_id: userId }, { $set: { ...data, updated_at: new Date() } });
};

export const deleteReminder = async (id, userId) => {
  const result = await Reminder.deleteOne({ reminder_id: id, user_id: userId });
  return result.deletedCount;
};

export const getDueReminders = async (currentDate, currentTime) => {
  return Reminder.find({ reminder_date: currentDate, reminder_time: currentTime, notification_status: 'pending' }).lean();
};

export const markReminderSent = async (id) => {
  await Reminder.updateOne({ reminder_id: id }, { $set: { notification_status: 'sent', updated_at: new Date() } });
};
