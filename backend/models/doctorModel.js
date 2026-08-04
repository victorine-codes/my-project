import mongoose from 'mongoose';

const createDoctorId = () => new mongoose.Types.ObjectId().toString();

const doctorSchema = new mongoose.Schema({
  doctor_id: { type: String, default: createDoctorId, unique: true },
  full_name: { type: String, required: true },
  specialization: { type: String },
  hospital: { type: String },
  phone: { type: String },
  email: { type: String },
  availability: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Doctor = mongoose.model('Doctor', doctorSchema);

export const createDoctor = async ({ fullName, specialization, hospital, phone, email, availability }) => {
  const doctor = await Doctor.create({
    full_name: fullName,
    specialization,
    hospital,
    phone,
    email,
    availability
  });
  return doctor.doctor_id;
};

export const getDoctors = async () => {
  return Doctor.find({}).sort({ full_name: 1 }).lean();
};

export const getDoctorById = async (id) => {
  return Doctor.findOne({ doctor_id: id }).lean();
};

export const updateDoctor = async (id, data) => {
  await Doctor.updateOne({ doctor_id: id }, { $set: { ...data, updated_at: new Date() } });
};

export const deleteDoctor = async (id) => {
  const result = await Doctor.deleteOne({ doctor_id: id });
  return result.deletedCount;
};
