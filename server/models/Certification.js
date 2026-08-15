import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: String,
  url: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);
