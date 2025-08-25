import { Router } from 'express';
import auth from '../middleware/auth.js';
import { markAttendance, getCourseAttendance } from '../controllers/attendanceController.js';
const router = Router();
router.post('/mark', auth, markAttendance); // method: 'qr' | 'bluetooth' | 'biometric' | 'face'
router.get('/course/:courseCode', auth, getCourseAttendance);
export default router;
