import mongoose, { Schema, Document } from 'mongoose';

export interface IBlockedUser extends Document {
  blocker: mongoose.Types.ObjectId;
  blocked: mongoose.Types.ObjectId;
}

const blockedUserSchema = new Schema({
  blocker: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blocked: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

blockedUserSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

export const BlockedUser = mongoose.model<IBlockedUser>('BlockedUser', blockedUserSchema);
