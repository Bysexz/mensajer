import { Router } from 'express';
import * as groupController from '../controllers/groupController';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect as any);

router.post('/', groupController.createGroup);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);
router.post('/:id/members', groupController.addMembers);
router.delete('/:id/members/:userId', groupController.removeMember);
router.put('/:id/members/:userId/role', groupController.changeRole);
router.get('/join/:inviteLink', groupController.joinByLink);

export default router;
