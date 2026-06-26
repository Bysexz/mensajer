import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await authService.register(req.body);
    res.status(201).json({ success: true, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.status(200).json({ success: true, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const tokens = await authService.refreshToken(token);
    res.status(200).json({ success: true, ...tokens });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    await authService.logout(token);
    res.status(200).json({ success: true, message: 'Cierre de sesión exitoso' });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req: any, res: Response, next: NextFunction) => {
  try {
    await authService.logoutAll(req.user.id);
    res.status(200).json({ success: true, message: 'Cierre de sesión en todos los dispositivos' });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(200).json({ success: true, message: 'Contraseña actualizada' });
  } catch (error) {
    next(error);
  }
};
