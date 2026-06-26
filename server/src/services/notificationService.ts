import { Notification } from '../models/Notification';

export const createNotification = async (userId: string, type: string, title: string, body: string, data?: any) => {
  return Notification.create({ user: userId, type, title, body, data });
};

export const getForUser = async (userId: string) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(50);
};

export const markAsRead = async (notificationId: string, userId: string) => {
  return Notification.findOneAndUpdate({ _id: notificationId, user: userId }, { isRead: true }, { new: true });
};
