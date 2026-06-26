import { Response, NextFunction } from 'express';
import * as notificationService from '../services/notificationService';

export const getNotifications = async (req: any, res: Response, next: NextFunction) => {
  try {
    const notifications = await notificationService.getForUser(req.user.id);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: any, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user.id);
    res.status(200).json({ success: true, notification });
  } catch (error) {
    next(error);
  }
};
