import { Server, Socket } from 'socket.io';
import { User } from '../models/User';

export default (io: Server, socket: Socket) => {
  const userId = socket.data.user.id;

  const updateUserStatus = async (status: string) => {
    await User.findByIdAndUpdate(userId, { 
      status, 
      lastSeen: new Date() 
    });
    io.emit('user:status', { userId, status, lastSeen: new Date() });
  };

  updateUserStatus('online');

  socket.on('user:away', () => updateUserStatus('away'));
  socket.on('user:busy', () => updateUserStatus('busy'));
  socket.on('user:online', () => updateUserStatus('online'));

  socket.on('disconnect', () => {
    updateUserStatus('offline');
  });
};
