import { Router } from 'express';
import * as fileController from '../controllers/fileController';
import { protect } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

router.use(protect as any);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:id', fileController.getFile);

export default router;
