import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from '../models/appointmentModel.js';

export const createAppointmentHandler = async (req, res, next) => {
  try {
    const id = await createAppointment({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, message: 'Appointment created successfully.', appointmentId: id });
  } catch (error) {
    next(error);
  }
};

export const listAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointments(req.user.id);
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentHandler = async (req, res, next) => {
  try {
    await updateAppointment(req.params.id, req.user.id, req.body);
    res.json({ success: true, message: 'Appointment updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointmentHandler = async (req, res, next) => {
  try {
    const deleted = await deleteAppointment(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    res.json({ success: true, message: 'Appointment deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
