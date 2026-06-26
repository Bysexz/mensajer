import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';

export default (io: Server, socket: Socket) => {
  socket.on('chat:join', (chatId: string) => {
    socket.join(chatId);
  });

  socket.on('chat:leave', (chatId: string) => {
    socket.leave(chatId);
  });

  socket.on('message:send', (data) => {
    io.to(data.chatId).emit('message:new', data);
  });

  socket.on('message:typing', (data: { chatId: string, isTyping: boolean }) => {
    socket.to(data.chatId).emit('message:typing', {
      chatId: data.chatId,
      userId: socket.data.user.id,
      isTyping: data.isTyping
    });
  });

  socket.on('message:read', async (data: { messageId: string, chatId: string }) => {
    await Message.findByIdAndUpdate(data.messageId, {
      $addToSet: { readBy: { user: socket.data.user.id, readAt: new Date() } }
    });
    io.to(data.chatId).emit('message:read', {
      messageId: data.messageId,
      userId: socket.data.user.id
    });
  });

  socket.on('message:delivered', async (data: { messageId: string, chatId: string }) => {
    await Message.findByIdAndUpdate(data.messageId, {
      $addToSet: { deliveredTo: { user: socket.data.user.id, deliveredAt: new Date() } }
    });
    io.to(data.chatId).emit('message:delivered', {
      messageId: data.messageId,
      userId: socket.data.user.id
    });
  });
};
