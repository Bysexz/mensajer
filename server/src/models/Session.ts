import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  device?: mongoose.Types.ObjectId;
  token: string;
  isActive: boolean;
  lastActivity: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  device: { type: Schema.Types.ObjectId, ref: 'Device' },
  token: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastActivity: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, expires: 0 }
}, { timestamps: true });

export const Session = mongoose.model<ISession>('Session', sessionSchema);
