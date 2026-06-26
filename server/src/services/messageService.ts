import { Message } from '../models/Message';
import { Chat } from '../models/Chat';
import { AppError } from '../middlewares/errorHandler';

export const getMessages = async (chatId: string, userId: string, cursor?: string, limit: number = 20) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId });
  if (!chat) throw new AppError('Chat no encontrado', 404);

  const query: any = { chat: chatId, isDeleted: false };
  if (cursor) {
    query.createdAt = { $lt: new Date(cursor) };
  }

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('sender', 'username avatar')
    .populate('replyTo', 'content type sender');

  return messages;
};

export const sendMessage = async (chatId: string, senderId: string, data: any) => {
  const chat = await Chat.findOne({ _id: chatId, participants: senderId });
  if (!chat) throw new AppError('Chat no encontrado', 404);

  const message = await Message.create({
    chat: chatId,
    sender: senderId,
    content: data.content,
    type: data.type || 'text',
    attachments: data.attachments || [],
    replyTo: data.replyTo
  });

  chat.lastMessage = {
    content: data.content,
    sender: senderId as any,
    type: data.type || 'text',
    createdAt: (message as any).createdAt || new Date()
  };
  await chat.save();

  return message.populate('sender', 'username avatar');
};

export const editMessage = async (messageId: string, userId: string, content: string) => {
  const message = await Message.findOne({ _id: messageId, sender: userId });
  if (!message) throw new AppError('Mensaje no encontrado o no tienes permiso', 404);

  message.content = content;
  message.isEdited = true;
  message.editedAt = new Date();
  await message.save();
  return message;
};

export const deleteMessage = async (messageId: string, userId: string) => {
  const message = await Message.findOne({ _id: messageId, sender: userId });
  if (!message) throw new AppError('Mensaje no encontrado o no tienes permiso', 404);

  message.isDeleted = true;
  message.deletedAt = new Date();
  await message.save();
};

export const reactToMessage = async (messageId: string, userId: string, emoji: string) => {
  const message = await Message.findById(messageId);
  if (!message) throw new AppError('Mensaje no encontrado', 404);

  const existingReaction = message.reactions.find(r => r.user.toString() === userId && r.emoji === emoji);
  if (existingReaction) {
    message.reactions = message.reactions.filter(r => r !== existingReaction) as any;
  } else {
    message.reactions.push({ emoji, user: userId as any, createdAt: new Date() });
  }
  
  await message.save();
  return message;
};

export const starMessage = async (messageId: string, userId: string) => {
  const message = await Message.findById(messageId);
  if (!message) throw new AppError('Mensaje no encontrado', 404);

  const index = message.isStarred.findIndex(id => id.toString() === userId);
  if (index > -1) {
    message.isStarred.splice(index, 1);
  } else {
    message.isStarred.push(userId as any);
  }
  
  await message.save();
  return message;
};

export const forwardMessage = async (messageId: string, userId: string, targetChatId: string) => {
  const original = await Message.findById(messageId);
  if (!original) throw new AppError('Mensaje original no encontrado', 404);
  
  const targetChat = await Chat.findOne({ _id: targetChatId, participants: userId });
  if (!targetChat) throw new AppError('Chat de destino no encontrado', 404);

  const forwarded = await Message.create({
    chat: targetChatId,
    sender: userId,
    content: original.content,
    type: original.type,
    attachments: original.attachments,
    isForwarded: true
  });

  return forwarded;
};
