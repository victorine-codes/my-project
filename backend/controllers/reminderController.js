import { createReminder, getReminders, updateReminder, deleteReminder } from '../models/reminderModel.js';

export const createReminderHandler = async (req, res, next) => {
  try {
    const id = await createReminder({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, message: 'Reminder created successfully.', reminderId: id });
  } catch (error) {
    next(error);
  }
};

export const listReminders = async (req, res, next) => {
  try {
    const reminders = await getReminders(req.user.id);
    res.json({ success: true, reminders });
  } catch (error) {
    next(error);
  }
};

export const updateReminderHandler = async (req, res, next) => {
  try {
    await updateReminder(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: 'Reminder updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteReminderHandler = async (req, res, next) => {
  try {
    const deleted = await deleteReminder(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Reminder not found.' });
    }
    res.json({ success: true, message: 'Reminder deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
