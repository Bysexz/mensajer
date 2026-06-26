import { Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

export const getStats = async (req: any, res: Response, next: NextFunction) => {
  try {
    const usersCount = await User.countDocuments();
    const chatsCount = await Chat.countDocuments();
    const messagesCount = await Message.countDocuments();
    
    res.status(200).json({ success: true, stats: { users: usersCount, chats: chatsCount, messages: messagesCount } });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isVerified: false }, { new: true });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
