import { Response, NextFunction } from 'express';
import * as fileService from '../services/fileService';
import { AppError } from '../middlewares/errorHandler';

export const uploadFile = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError('No se subió ningún archivo', 400);
    const file = await fileService.uploadFile(req.user.id, req.body.chatId, req.file);
    res.status(201).json({ success: true, file });
  } catch (error) {
    next(error);
  }
};

export const getFile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const file = await fileService.getFile(req.params.id);
    res.status(200).json({ success: true, file });
  } catch (error) {
    next(error);
  }
};
