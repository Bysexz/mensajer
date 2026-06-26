import { User } from '../models/User';
import { BlockedUser } from '../models/BlockedUser';
import { AppError } from '../middlewares/errorHandler';

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

export const updateProfile = async (userId: string, data: any) => {
  if (data.password) throw new AppError('No puedes cambiar la contraseña aquí', 400);
  const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select('-password');
  return user;
};

export const searchUsers = async (query: string, currentUserId: string) => {
  const blockedByMe = await BlockedUser.find({ blocker: currentUserId }).distinct('blocked');
  const blockedMe = await BlockedUser.find({ blocked: currentUserId }).distinct('blocker');
  
  const blockedIds = [...blockedByMe, ...blockedMe];

  return User.find({
    $and: [
      { _id: { $nin: blockedIds, $ne: currentUserId } },
      { $or: [{ username: new RegExp(query, 'i') }, { firstName: new RegExp(query, 'i') }, { lastName: new RegExp(query, 'i') }] }
    ]
  }).select('username firstName lastName avatar status customStatus');
};

export const blockUser = async (blockerId: string, blockedId: string) => {
  if (blockerId === blockedId) throw new AppError('No puedes bloquearte a ti mismo', 400);
  await BlockedUser.findOneAndUpdate(
    { blocker: blockerId, blocked: blockedId },
    { blocker: blockerId, blocked: blockedId },
    { upsert: true }
  );
};

export const unblockUser = async (blockerId: string, blockedId: string) => {
  await BlockedUser.findOneAndDelete({ blocker: blockerId, blocked: blockedId });
};
