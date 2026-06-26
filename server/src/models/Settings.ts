import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  user: mongoose.Types.ObjectId;
  theme: string;
  language: string;
  notifications: any;
  chatSettings: any;
  privacySettings: any;
}

const settingsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  theme: { type: String, default: 'light' },
  language: { type: String, default: 'es' },
  notifications: { type: Schema.Types.Mixed, default: {} },
  chatSettings: { type: Schema.Types.Mixed, default: {} },
  privacySettings: { type: Schema.Types.Mixed, default: {} }
});

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema);
