import { createMedication, getMedications, getMedicationById, updateMedication, deleteMedication } from '../models/medicationModel.js';

export const createMedicationHandler = async (req, res, next) => {
  try {
    const id = await createMedication({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, message: 'Medication created successfully.', medicationId: id });
  } catch (error) {
    next(error);
  }
};

export const listMedications = async (req, res, next) => {
  try {
    const medications = await getMedications(req.user.id);
    res.json({ success: true, medications });
  } catch (error) {
    next(error);
  }
};

export const getMedication = async (req, res, next) => {
  try {
    const medication = await getMedicationById(req.params.id, req.user.id);
    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found.' });
    }
    res.json({ success: true, medication });
  } catch (error) {
    next(error);
  }
};

export const updateMedicationHandler = async (req, res, next) => {
  try {
    await updateMedication(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: 'Medication updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicationHandler = async (req, res, next) => {
  try {
    const deleted = await deleteMedication(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Medication not found.' });
    }
    res.json({ success: true, message: 'Medication deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
