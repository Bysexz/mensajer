import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  user: mongoose.Types.ObjectId;
  contact: mongoose.Types.ObjectId;
  nickname?: string;
  isFavorite: boolean;
}

const contactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contact: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nickname: String,
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

contactSchema.index({ user: 1, contact: 1 }, { unique: true });

export const Contact = mongoose.model<IContact>('Contact', contactSchema);
