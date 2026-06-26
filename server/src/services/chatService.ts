import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { AppError } from '../middlewares/errorHandler';

export const getChats = async (userId: string) => {
  return Chat.find({ participants: userId })
    .populate('participants', 'username firstName lastName avatar status')
    .sort({ updatedAt: -1 });
};

export const createChat = async (userId: string, targetUserId: string) => {
  if (userId === targetUserId) throw new AppError('No puedes crear un chat contigo mismo', 400);
  
  let chat = await Chat.findOne({
    type: 'private',
    participants: { $all: [userId, targetUserId] }
  });

  if (!chat) {
    chat = await Chat.create({
      type: 'private',
      participants: [userId, targetUserId]
    });
  }
  return chat.populate('participants', 'username firstName lastName avatar status');
};

export const getChatById = async (chatId: string, userId: string) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId })
    .populate('participants', 'username firstName lastName avatar status');
  if (!chat) throw new AppError('Chat no encontrado', 404);
  return chat;
};

export const deleteChat = async (chatId: string, userId: string) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId });
  if (!chat) throw new AppError('Chat no encontrado', 404);
  
  await Message.deleteMany({ chat: chatId });
  await chat.deleteOne();
};

export const archiveChat = async (chatId: string, userId: string, archive: boolean) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId });
  if (!chat) throw new AppError('Chat no encontrado', 404);
  
  chat.isArchived.set(userId, archive);
  await chat.save();
  return chat;
};

export const muteChat = async (chatId: string, userId: string, mute: boolean) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId });
  if (!chat) throw new AppError('Chat no encontrado', 404);
  
  chat.isMuted.set(userId, mute);
  await chat.save();
  return chat;
};
