import mongoose, { Schema, Document } from 'mongoose';

export interface IStatus extends Document {
  user: mongoose.Types.ObjectId;
  content?: string;
  media?: {
    url: string;
    type: string;
  };
  backgroundColor?: string;
  viewers: Array<{
    user: mongoose.Types.ObjectId;
    viewedAt: Date;
  }>;
  expiresAt: Date;
}

const statusSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  media: {
    url: String,
    type: String
  },
  backgroundColor: String,
  viewers: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    viewedAt: { type: Date, default: Date.now }
  }],
  expiresAt: { type: Date, required: true, expires: 0 } // TTL index
}, { timestamps: true });

export const Status = mongoose.model<IStatus>('Status', statusSchema);
