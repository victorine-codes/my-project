import { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../models/doctorModel.js';

export const createDoctorHandler = async (req, res, next) => {
  try {
    const id = await createDoctor(req.body);
    res.status(201).json({ success: true, message: 'Doctor created successfully.', doctorId: id });
  } catch (error) {
    next(error);
  }
};

export const listDoctors = async (req, res, next) => {
  try {
    const doctors = await getDoctors();
    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

export const getDoctor = async (req, res, next) => {
  try {
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

export const updateDoctorHandler = async (req, res, next) => {
  try {
    await updateDoctor(req.params.id, req.body);
    res.json({ success: true, message: 'Doctor updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctorHandler = async (req, res, next) => {
  try {
    const deleted = await deleteDoctor(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }
    res.json({ success: true, message: 'Doctor deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
