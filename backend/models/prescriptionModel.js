import mongoose from 'mongoose';

const createPrescriptionId = () => new mongoose.Types.ObjectId().toString();

const prescriptionSchema = new mongoose.Schema({
  prescription_id: { type: String, default: createPrescriptionId, unique: true },
  user_id: { type: String, required: true },
  file_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export const createPrescription = async ({ userId, fileUrl }) => {
  const prescription = await Prescription.create({ user_id: userId, file_url: fileUrl });
  return prescription.prescription_id;
};

export const getPrescriptions = async (userId) => {
  return Prescription.find({ user_id: userId }).sort({ uploaded_at: -1 }).lean();
};

export const deletePrescription = async (id, userId) => {
  const result = await Prescription.deleteOne({ prescription_id: id, user_id: userId });
  return result.deletedCount;
};
