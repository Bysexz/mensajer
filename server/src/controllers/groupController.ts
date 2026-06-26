import { Response, NextFunction } from 'express';
import * as groupService from '../services/groupService';

export const createGroup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.createGroup(req.user.id, req.body.name, req.body.memberIds || []);
    res.status(201).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.updateGroup(req.params.id, req.user.id, req.body);
    res.status(200).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req: any, res: Response, next: NextFunction) => {
  try {
    await groupService.deleteGroup(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Grupo eliminado' });
  } catch (error) {
    next(error);
  }
};

export const addMembers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.addMembers(req.params.id, req.user.id, req.body.memberIds);
    res.status(200).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req: any, res: Response, next: NextFunction) => {
  try {
    await groupService.removeMember(req.params.id, req.user.id, req.params.userId);
    res.status(200).json({ success: true, message: 'Miembro eliminado' });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req: any, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.changeRole(req.params.id, req.user.id, req.params.userId, req.body.role);
    res.status(200).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

export const joinByLink = async (req: any, res: Response, next: NextFunction) => {
  try {
    const group = await groupService.joinByLink(req.params.inviteLink, req.user.id);
    res.status(200).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};
