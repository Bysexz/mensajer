import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect as any);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);
router.post('/:id/block', userController.blockUser);
router.delete('/:id/block', userController.unblockUser);

export default router;
