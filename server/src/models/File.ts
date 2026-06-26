import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  uploader: mongoose.Types.ObjectId;
  message?: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
}

const fileSchema = new Schema({
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: Schema.Types.ObjectId, ref: 'Message' },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  thumbnail: String
}, { timestamps: true });

export const File = mongoose.model<IFile>('File', fileSchema);
