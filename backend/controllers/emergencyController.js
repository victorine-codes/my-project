import { createEmergencyContact, getEmergencyContacts, updateEmergencyContact, deleteEmergencyContact } from '../models/emergencyModel.js';
import { sendEmergencyNotification } from '../services/notificationService.js';
import { findUserById } from '../models/authModel.js';

export const createEmergencyHandler = async (req, res, next) => {
  try {
    const id = await createEmergencyContact({ userId: req.user.id, ...req.body });
    const user = await findUserById(req.user.id);
    await sendEmergencyNotification(user, req.body.name);
    res.status(201).json({ success: true, message: 'Emergency contact created successfully.', emergencyContactId: id });
  } catch (error) {
    next(error);
  }
};

export const listEmergencyContacts = async (req, res, next) => {
  try {
    const contacts = await getEmergencyContacts(req.user.id);
    res.json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

export const updateEmergencyHandler = async (req, res, next) => {
  try {
    await updateEmergencyContact(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: 'Emergency contact updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteEmergencyHandler = async (req, res, next) => {
  try {
    const deleted = await deleteEmergencyContact(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Emergency contact not found.' });
    }
    res.json({ success: true, message: 'Emergency contact deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
