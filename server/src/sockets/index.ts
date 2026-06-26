import { Server } from 'socket.io';
import chatSocket from './chatSocket';
import presenceSocket from './presenceSocket';
import notificationSocket from './notificationSocket';
import logger from '../middlewares/logger';

export default (io: Server) => {
  io.on('connection', (socket) => {
    const user = socket.data.user;
    logger.info(`Usuario conectado: ${user.username} (${socket.id})`);

    socket.join(user.id.toString());
    presenceSocket(io, socket);
    chatSocket(io, socket);
    notificationSocket(io, socket);

    socket.on('disconnect', () => {
      logger.info(`Usuario desconectado: ${user.username} (${socket.id})`);
    });
  });
};
