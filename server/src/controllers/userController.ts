import { Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    const users = await userService.searchUsers(q as string, req.user.id);
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getProfile(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    await userService.blockUser(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: 'Usuario bloqueado' });
  } catch (error) {
    next(error);
  }
};

export const unblockUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    await userService.unblockUser(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: 'Usuario desbloqueado' });
  } catch (error) {
    next(error);
  }
};
