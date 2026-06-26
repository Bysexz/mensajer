import { Router } from 'express';
import * as messageController from '../controllers/messageController';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect as any);

router.get('/:chatId', messageController.getMessages);
router.post('/:chatId', messageController.sendMessage);
router.put('/:id', messageController.editMessage);
router.delete('/:id', messageController.deleteMessage);
router.post('/:id/react', messageController.reactToMessage);
router.post('/:id/star', messageController.starMessage);
router.post('/:id/forward', messageController.forwardMessage);

export default router;
