import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User } from '../models/User';
import { AuthRequest, DecodedToken } from '../types';
import { AppError } from './errorHandler';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError('No autorizado, token no proporcionado', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new AppError('El usuario ya no existe', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('No autorizado, token inválido', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('No tienes permisos para realizar esta acción', 403));
    }
    next();
  };
};
