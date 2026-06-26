import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { env } from './env';
import { User } from '../models/User';
import logger from '../middlewares/logger';
import setupSockets from '../sockets';

export const initializeSocket = (httpServer: Server): SocketServer => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      if (!token) return next(new Error('No autenticado'));

      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id);
      
      if (!user) return next(new Error('Usuario no encontrado'));
      
      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error('Token inválido'));
    }
  });

  setupSockets(io);
  
  return io;
};
