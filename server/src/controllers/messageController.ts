import { Response, NextFunction } from 'express';
import * as messageService from '../services/messageService';

export const getMessages = async (req: any, res: Response, next: NextFunction) => {
  try {
    const messages = await messageService.getMessages(req.params.chatId, req.user.id, req.query.cursor as string);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const message = await messageService.sendMessage(req.params.chatId, req.user.id, req.body);
    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const message = await messageService.editMessage(req.params.id, req.user.id, req.body.content);
    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    await messageService.deleteMessage(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Mensaje eliminado' });
  } catch (error) {
    next(error);
  }
};

export const reactToMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const message = await messageService.reactToMessage(req.params.id, req.user.id, req.body.emoji);
    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export const starMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const message = await messageService.starMessage(req.params.id, req.user.id);
    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export const forwardMessage = async (req: any, res: Response, next: NextFunction) => {
  try {
    const message = await messageService.forwardMessage(req.params.id, req.user.id, req.body.targetChatId);
    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};
