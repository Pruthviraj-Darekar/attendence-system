import mongoose from 'mongoose';
const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  method: { type: String, enum: ['qr','bluetooth','biometric','face'], required: true },
  timestamp: { type: Date, default: Date.now },
  meta: {
    geo: { lat: Number, lng: Number, accuracy: Number },
    device: { type: String },
    livenessScore: { type: Number }
  }
}, { timestamps: true });
AttendanceSchema.index({ user: 1, course: 1, timestamp: -1 });
export default mongoose.model('Attendance', AttendanceSchema);
