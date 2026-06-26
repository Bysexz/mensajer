import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { protect, authorize } from '../middlewares/auth';

const router = Router();

router.use(protect as any);
router.use(authorize('admin', 'superadmin') as any);

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getUsers);
router.put('/users/:id/ban', adminController.banUser);

export default router;
