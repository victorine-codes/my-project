import mongoose from 'mongoose';

const createMedicationId = () => new mongoose.Types.ObjectId().toString();

const medicationSchema = new mongoose.Schema({
  medication_id: { type: String, default: createMedicationId, unique: true },
  user_id: { type: String, required: true },
  medication_name: { type: String, required: true },
  dosage: { type: String },
  frequency: { type: String },
  instructions: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  status: { type: String, default: 'active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const Medication = mongoose.model('Medication', medicationSchema);

export const createMedication = async ({ userId, medicationName, dosage, frequency, instructions, startDate, endDate, status }) => {
  const medication = await Medication.create({
    user_id: userId,
    medication_name: medicationName,
    dosage,
    frequency,
    instructions,
    start_date: startDate,
    end_date: endDate,
    status: status || 'active'
  });
  return medication.medication_id;
};

export const getMedications = async (userId) => {
  return Medication.find({ user_id: userId }).sort({ created_at: -1 }).lean();
};

export const getMedicationById = async (id, userId) => {
  return Medication.findOne({ medication_id: id, user_id: userId }).lean();
};

export const updateMedication = async (id, userId, data) => {
  await Medication.updateOne({ medication_id: id, user_id: userId }, { $set: { ...data, updated_at: new Date() } });
};

export const deleteMedication = async (id, userId) => {
  const result = await Medication.deleteOne({ medication_id: id, user_id: userId });
  return result.deletedCount;
};
