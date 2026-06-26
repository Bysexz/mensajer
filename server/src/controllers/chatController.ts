import { Response, NextFunction } from 'express';
import * as chatService from '../services/chatService';

export const getChats = async (req: any, res: Response, next: NextFunction) => {
  try {
    const chats = await chatService.getChats(req.user.id);
    res.status(200).json({ success: true, chats });
  } catch (error) {
    next(error);
  }
};

export const createChat = async (req: any, res: Response, next: NextFunction) => {
  try {
    const chat = await chatService.createChat(req.user.id, req.body.targetUserId);
    res.status(201).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

export const getChatById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const chat = await chatService.getChatById(req.params.id, req.user.id);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (req: any, res: Response, next: NextFunction) => {
  try {
    await chatService.deleteChat(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Chat eliminado' });
  } catch (error) {
    next(error);
  }
};

export const archiveChat = async (req: any, res: Response, next: NextFunction) => {
  try {
    const chat = await chatService.archiveChat(req.params.id, req.user.id, req.body.archive);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

export const muteChat = async (req: any, res: Response, next: NextFunction) => {
  try {
    const chat = await chatService.muteChat(req.params.id, req.user.id, req.body.mute);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};
