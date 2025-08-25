import Attendance from '../models/Attendance.js';
import Course from '../models/Course.js';
import { isWithinRadius } from '../utils/geo.js';

export async function markAttendance(req, res) {
  try {
    const { courseCode, method, geo, device, livenessScore } = req.body;
    const course = await Course.findOne({ code: courseCode });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Example geo validation (optional if no geo provided)
    const classroomCenter = { lat: 18.5204, lng: 73.8567 }; // Pune placeholder
    if (geo && !isWithinRadius(geo, classroomCenter, 150)) {
      return res.status(400).json({ message: 'Outside classroom geofence' });
    }

    const att = await Attendance.create({
      user: req.user.sub,
      course: course._id,
      method,
      meta: { geo, device, livenessScore }
    });
    res.status(201).json({ id: att._id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function getCourseAttendance(req, res) {
  const { courseCode } = req.params;
  const course = await Course.findOne({ code: courseCode });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const logs = await Attendance.find({ course: course._id }).populate('user','name studentId');
  res.json({ course: course.name, count: logs.length, logs });
}
