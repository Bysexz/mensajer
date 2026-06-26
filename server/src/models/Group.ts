import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  chat: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  avatar?: string;
  inviteLink?: string;
  members: Array<{
    user: mongoose.Types.ObjectId;
    role: 'admin' | 'moderator' | 'member';
    joinedAt: Date;
    addedBy?: mongoose.Types.ObjectId;
  }>;
  settings: {
    onlyAdminsCanPost: boolean;
    onlyAdminsCanEditInfo: boolean;
    approvalRequired: boolean;
  };
  createdBy: mongoose.Types.ObjectId;
}

const groupSchema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  name: { type: String, required: true },
  description: String,
  avatar: String,
  inviteLink: { type: String, unique: true, sparse: true },
  members: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'moderator', 'member'], default: 'member' },
    joinedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  settings: {
    onlyAdminsCanPost: { type: Boolean, default: false },
    onlyAdminsCanEditInfo: { type: Boolean, default: false },
    approvalRequired: { type: Boolean, default: false }
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Group = mongoose.model<IGroup>('Group', groupSchema);
