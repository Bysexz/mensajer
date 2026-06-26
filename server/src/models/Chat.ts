import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  type: 'private' | 'group';
  participants: mongoose.Types.ObjectId[];
  lastMessage?: {
    content: string;
    sender: mongoose.Types.ObjectId;
    type: string;
    createdAt: Date;
  };
  pinnedMessages: mongoose.Types.ObjectId[];
  isArchived: Map<string, boolean>;
  isMuted: Map<string, boolean>;
  unreadCount: Map<string, number>;
}

const chatSchema = new Schema({
  type: { type: String, enum: ['private', 'group'], required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: {
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    createdAt: Date
  },
  pinnedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  isArchived: { type: Map, of: Boolean, default: new Map() },
  isMuted: { type: Map, of: Boolean, default: new Map() },
  unreadCount: { type: Map, of: Number, default: new Map() }
}, { timestamps: true });

chatSchema.index({ participants: 1 });
chatSchema.index({ updatedAt: -1 });

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
