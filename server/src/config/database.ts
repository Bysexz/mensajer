import mongoose from 'mongoose';
import { env } from './env';
import logger from '../middlewares/logger';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error de conexión a MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};
