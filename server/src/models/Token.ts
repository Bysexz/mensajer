import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  type: 'refresh' | 'reset_password' | 'email_verification';
  device?: mongoose.Types.ObjectId;
  expiresAt: Date;
  isRevoked: boolean;
}

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  type: { type: String, enum: ['refresh', 'reset_password', 'email_verification'], required: true },
  device: { type: Schema.Types.ObjectId, ref: 'Device' },
  expiresAt: { type: Date, required: true, expires: 0 },
  isRevoked: { type: Boolean, default: false }
}, { timestamps: true });

export const Token = mongoose.model<IToken>('Token', tokenSchema);
