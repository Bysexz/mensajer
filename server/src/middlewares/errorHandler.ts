import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Recurso no encontrado. ID inválido: ${err.value}`;
    error = new AppError(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Valor duplicado ingresado para un campo único';
    error = new AppError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    error = new AppError(message, 400);
  }
  
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido. Por favor inicia sesión nuevamente.';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado. Por favor inicia sesión nuevamente.';
    error = new AppError(message, 401);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  if (statusCode === 500) {
    logger.error(`[Error 500] ${err.message}`, { stack: err.stack });
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
