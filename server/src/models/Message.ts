import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'gif' | 'sticker' | 'system';
  replyTo?: mongoose.Types.ObjectId;
  attachments: Array<{
    url: string;
    filename: string;
    mimeType: string;
    size: number;
    thumbnail?: string;
  }>;
  reactions: Array<{
    emoji: string;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
  }>;
  readBy: Array<{
    user: mongoose.Types.ObjectId;
    readAt: Date;
  }>;
  deliveredTo: Array<{
    user: mongoose.Types.ObjectId;
    deliveredAt: Date;
  }>;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  isStarred: mongoose.Types.ObjectId[];
  isForwarded: boolean;
}

const messageSchema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  type: { type: String, enum: ['text', 'image', 'video', 'audio', 'document', 'gif', 'sticker', 'system'], default: 'text' },
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
  attachments: [{
    url: String,
    filename: String,
    mimeType: String,
    size: Number,
    thumbnail: String
  }],
  reactions: [{
    emoji: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  readBy: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }],
  deliveredTo: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    deliveredAt: { type: Date, default: Date.now }
  }],
  isEdited: { type: Boolean, default: false },
  editedAt: Date,
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
  isStarred: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isForwarded: { type: Boolean, default: false }
}, { timestamps: true });

messageSchema.index({ chat: 1, createdAt: -1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);
