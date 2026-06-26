import app from '../src/app';
import { connectDB } from '../src/config/database';
import mongoose from 'mongoose';

// Ensure DB is connected for serverless functions
let isConnected = false;

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  if (!isConnected && mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error("Error conectando a la BD en Vercel", error);
    }
  }
  next();
});

export default app;
