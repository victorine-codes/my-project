import axios from 'axios';
import { createNotification } from '../models/notificationModel.js';
import { logger } from '../utils/logger.js';

export const sendNotification = async ({ userId, title, message, type = 'general', fcmToken }) => {
  try {
    await createNotification({ userId, title, message, status: 'sent' });

    if (!fcmToken) {
      logger.info(`Notification queued for user ${userId}: ${title}`);
      return { success: true, message: 'Notification stored locally.' };
    }

    await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: fcmToken,
        notification: { title, body: message },
        data: { type, userId: String(userId) }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${process.env.FCM_SERVER_KEY || ''}`
        }
      }
    );

    logger.info(`FCM notification sent to user ${userId}`);
    return { success: true };
  } catch (error) {
    logger.error(`Notification error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const sendReminderNotification = async (reminder, user, medication) => {
  const title = 'Medication Reminder';
  const message = `Time to take ${medication?.medication_name || 'your medication'}${medication?.dosage ? ` (${medication.dosage})` : ''}.`;
  return sendNotification({ userId: user.user_id, title, message, type: 'medication_reminder', fcmToken: process.env.FCM_DEVICE_TOKEN });
};

export const sendAppointmentReminder = async (appointment, user) => {
  const title = 'Appointment Reminder';
  const message = `You have an appointment today at ${appointment.appointment_time}.`;
  return sendNotification({ userId: user.user_id, title, message, type: 'appointment_reminder', fcmToken: process.env.FCM_DEVICE_TOKEN });
};

export const sendPrescriptionReminder = async (user) => {
  const title = 'Prescription Upload';
  const message = 'Please upload your latest prescription to keep your records updated.';
  return sendNotification({ userId: user.user_id, title, message, type: 'prescription_reminder', fcmToken: process.env.FCM_DEVICE_TOKEN });
};

export const sendEmergencyNotification = async (user, contactName) => {
  const title = 'Emergency Alert';
  const message = `${contactName} has been notified as your emergency contact.`;
  return sendNotification({ userId: user.user_id, title, message, type: 'emergency_alert', fcmToken: process.env.FCM_DEVICE_TOKEN });
};
