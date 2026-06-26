import { Group } from '../models/Group';
import { Chat } from '../models/Chat';
import { AppError } from '../middlewares/errorHandler';
import crypto from 'crypto';

export const createGroup = async (userId: string, name: string, memberIds: string[]) => {
  const chat = await Chat.create({
    type: 'group',
    participants: [userId, ...memberIds]
  });

  const group = await Group.create({
    chat: chat._id,
    name,
    createdBy: userId,
    members: [
      { user: userId, role: 'admin' },
      ...memberIds.map(id => ({ user: id, role: 'member' }))
    ],
    inviteLink: crypto.randomBytes(8).toString('hex')
  });

  return group.populate('members.user', 'username firstName lastName avatar');
};

export const updateGroup = async (groupId: string, userId: string, data: any) => {
  const group = await Group.findOne({ _id: groupId, 'members.user': userId, 'members.role': { $in: ['admin', 'moderator'] } });
  if (!group) throw new AppError('Grupo no encontrado o no tienes permiso', 404);

  Object.assign(group, data);
  await group.save();
  return group;
};

export const deleteGroup = async (groupId: string, userId: string) => {
  const group = await Group.findOne({ _id: groupId, 'members.user': userId, 'members.role': 'admin' });
  if (!group) throw new AppError('Grupo no encontrado o no eres administrador', 404);

  await Chat.findByIdAndDelete(group.chat);
  await group.deleteOne();
};

export const addMembers = async (groupId: string, userId: string, newMemberIds: string[]) => {
  const group = await Group.findOne({ _id: groupId, 'members.user': userId, 'members.role': { $in: ['admin', 'moderator'] } });
  if (!group) throw new AppError('Grupo no encontrado o no tienes permiso', 404);

  const newMembers = newMemberIds.map(id => ({ user: id as any, role: 'member' as const, addedBy: userId as any, joinedAt: new Date() }));
  group.members.push(...newMembers);
  await group.save();
  
  await Chat.findByIdAndUpdate(group.chat, { $addToSet: { participants: { $each: newMemberIds } } });
  return group;
};

export const removeMember = async (groupId: string, adminId: string, memberId: string) => {
  const group = await Group.findOne({ _id: groupId, 'members.user': adminId, 'members.role': { $in: ['admin', 'moderator'] } });
  if (!group) throw new AppError('No tienes permiso para eliminar miembros', 403);

  group.members = group.members.filter(m => m.user.toString() !== memberId) as any;
  await group.save();
  
  await Chat.findByIdAndUpdate(group.chat, { $pull: { participants: memberId } });
};

export const changeRole = async (groupId: string, adminId: string, memberId: string, newRole: string) => {
  const group = await Group.findOne({ _id: groupId, 'members.user': adminId, 'members.role': 'admin' });
  if (!group) throw new AppError('Solo los administradores pueden cambiar roles', 403);

  const member = group.members.find(m => m.user.toString() === memberId);
  if (!member) throw new AppError('Miembro no encontrado en el grupo', 404);

  member.role = newRole as 'admin'|'moderator'|'member';
  await group.save();
  return group;
};

export const joinByLink = async (inviteLink: string, userId: string) => {
  const group = await Group.findOne({ inviteLink });
  if (!group) throw new AppError('Enlace de invitación inválido', 404);

  if (group.members.some(m => m.user.toString() === userId)) {
    throw new AppError('Ya eres miembro de este grupo', 400);
  }

  group.members.push({ user: userId as any, role: 'member', joinedAt: new Date() });
  await group.save();
  
  await Chat.findByIdAndUpdate(group.chat, { $addToSet: { participants: userId } });
  return group;
};
