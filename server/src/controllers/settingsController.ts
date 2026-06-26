import { Response, NextFunction } from 'express';
import { Settings } from '../models/Settings';

export const getSettings = async (req: any, res: Response, next: NextFunction) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      settings = await Settings.create({ user: req.user.id });
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: any, res: Response, next: NextFunction) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};
