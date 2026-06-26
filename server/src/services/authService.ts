import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { Token } from '../models/Token';
import { AppError } from '../middlewares/errorHandler';
import { env } from '../config/env';

export const generateTokens = async (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
  const refreshToken = jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any });
  
  await Token.create({
    user: userId,
    token: refreshToken,
    type: 'refresh',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken, refreshToken };
};

export const register = async (userData: any) => {
  const existingUser = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] });
  if (existingUser) {
    throw new AppError('El usuario o email ya existe', 400);
  }

  const user = await User.create(userData);
  return generateTokens(user.id);
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Credenciales inválidas', 401);
  }

  return generateTokens(user.id);
};

export const refreshToken = async (token: string) => {
  const tokenDoc = await Token.findOne({ token, type: 'refresh', isRevoked: false });
  if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
    throw new AppError('Refresh token inválido o expirado', 401);
  }

  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
  await Token.deleteOne({ _id: tokenDoc._id }); // Rotation

  return generateTokens(decoded.id);
};

export const logout = async (token: string) => {
  await Token.updateOne({ token, type: 'refresh' }, { isRevoked: true });
};

export const logoutAll = async (userId: string) => {
  await Token.updateMany({ user: userId, type: 'refresh' }, { isRevoked: true });
};

export const changePassword = async (userId: string, oldPass: string, newPass: string) => {
  const user = await User.findById(userId);
  if (!user || !(await user.comparePassword(oldPass))) {
    throw new AppError('Contraseña actual incorrecta', 400);
  }
  user.password = newPass;
  await user.save();
};
