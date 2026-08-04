import mongoose from 'mongoose';

const createAppointmentId = () => new mongoose.Types.ObjectId().toString();

const appointmentSchema = new mongoose.Schema({
  appointment_id: { type: String, default: createAppointmentId, unique: true },
  doctor_id: { type: String, required: true },
  user_id: { type: String, required: true },
  appointment_date: { type: String, required: true },
  appointment_time: { type: String, required: true },
  status: { type: String, default: 'scheduled' },
  notes: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export const createAppointment = async ({ doctorId, userId, appointmentDate, appointmentTime, status, notes }) => {
  const appointment = await Appointment.create({
    doctor_id: doctorId,
    user_id: userId,
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    status: status || 'scheduled',
    notes: notes || ''
  });
  return appointment.appointment_id;
};

export const getAppointments = async (userId) => {
  return Appointment.find({ user_id: userId }).sort({ appointment_date: 1, appointment_time: 1 }).lean();
};

export const updateAppointment = async (id, userId, data) => {
  await Appointment.updateOne({ appointment_id: id, user_id: userId }, { $set: { ...data, updated_at: new Date() } });
};

export const deleteAppointment = async (id, userId) => {
  const result = await Appointment.deleteOne({ appointment_id: id, user_id: userId });
  return result.deletedCount;
};
