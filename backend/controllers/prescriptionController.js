import { createPrescription, getPrescriptions, deletePrescription } from '../models/prescriptionModel.js';
import { sendPrescriptionReminder } from '../services/notificationService.js';
import { findUserById } from '../models/authModel.js';

export const createPrescriptionHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Prescription file is required.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const id = await createPrescription({ userId: req.user.id, fileUrl });
    const user = await findUserById(req.user.id);
    await sendPrescriptionReminder(user);
    res.status(201).json({ success: true, message: 'Prescription uploaded successfully.', prescriptionId: id, fileUrl });
  } catch (error) {
    next(error);
  }
};

export const listPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await getPrescriptions(req.user.id);
    res.json({ success: true, prescriptions });
  } catch (error) {
    next(error);
  }
};

export const deletePrescriptionHandler = async (req, res, next) => {
  try {
    const deleted = await deletePrescription(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Prescription not found.' });
    }
    res.json({ success: true, message: 'Prescription deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
