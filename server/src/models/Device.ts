import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  user: mongoose.Types.ObjectId;
  deviceName: string;
  platform: string;
  browser: string;
  ip: string;
  lastActive: Date;
  isActive: boolean;
}

const deviceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceName: String,
  platform: String,
  browser: String,
  ip: String,
  lastActive: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Device = mongoose.model<IDevice>('Device', deviceSchema);
