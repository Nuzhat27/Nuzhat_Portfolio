import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true, trim: true },
  goal: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  stack: [{ type: String }],
  github: String,
  live: String,
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
