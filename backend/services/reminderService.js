import cron from 'node-cron';
import { format } from 'date-fns';
import { getDueReminders, markReminderSent } from '../models/reminderModel.js';
import { getMedicationById } from '../models/medicationModel.js';
import { findUserById } from '../models/authModel.js';
import { sendReminderNotification } from './notificationService.js';
import { logger } from '../utils/logger.js';

export const startReminderScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      const currentTime = format(new Date(), 'HH:mm');
      const reminders = await getDueReminders(currentDate, currentTime);

      for (const reminder of reminders) {
        const medication = await getMedicationById(reminder.medication_id, reminder.user_id);
        const user = await findUserById(reminder.user_id);
        if (medication && user) {
          await sendReminderNotification(reminder, user, medication);
          await markReminderSent(reminder.reminder_id);
          logger.info(`Reminder ${reminder.reminder_id} executed for user ${user.user_id}`);
        }
      }
    } catch (error) {
      logger.error(`Reminder scheduler error: ${error.message}`);
    }
  });
};
