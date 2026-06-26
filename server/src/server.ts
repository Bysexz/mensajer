import http from 'http';
import app from './app';
import { initializeSocket } from './config/socket';

export const createServer = () => {
  const server = http.createServer(app);
  
  const io = initializeSocket(server);
  
  return { server, io };
};
