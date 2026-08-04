import mongoose from 'mongoose';

const createEmergencyContactId = () => new mongoose.Types.ObjectId().toString();

const emergencyContactSchema = new mongoose.Schema({
  emergency_contact_id: { type: String, default: createEmergencyContactId, unique: true },
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  relationship: { type: String },
  phone: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

export const createEmergencyContact = async ({ userId, name, relationship, phone }) => {
  const contact = await EmergencyContact.create({ user_id: userId, name, relationship, phone });
  return contact.emergency_contact_id;
};

export const getEmergencyContacts = async (userId) => {
  return EmergencyContact.find({ user_id: userId }).sort({ created_at: -1 }).lean();
};

export const updateEmergencyContact = async (id, userId, data) => {
  await EmergencyContact.updateOne({ emergency_contact_id: id, user_id: userId }, { $set: { ...data, updated_at: new Date() } });
};

export const deleteEmergencyContact = async (id, userId) => {
  const result = await EmergencyContact.deleteOne({ emergency_contact_id: id, user_id: userId });
  return result.deletedCount;
};
