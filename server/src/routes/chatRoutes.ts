import { Router } from 'express';
import * as chatController from '../controllers/chatController';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect as any);

router.get('/', chatController.getChats);
router.post('/', chatController.createChat);
router.get('/:id', chatController.getChatById);
router.delete('/:id', chatController.deleteChat);
router.put('/:id/archive', chatController.archiveChat);
router.put('/:id/mute', chatController.muteChat);

export default router;
