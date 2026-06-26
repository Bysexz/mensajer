import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket) => {
  socket.on('notification:send', (data: { to: string, notification: any }) => {
    io.to(data.to).emit('notification:new', data.notification);
  });
};
