import { Router } from 'express';
import auth from '../middleware/auth.js';
import { me, list } from '../controllers/userController.js';
const router = Router();
router.get('/me', auth, me);
router.get('/', auth, list);
export default router;
