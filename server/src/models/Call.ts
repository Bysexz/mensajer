import mongoose, { Schema, Document } from 'mongoose';

export interface ICall extends Document {
  type: 'voice' | 'video';
  caller: mongoose.Types.ObjectId;
  participants: Array<{
    user: mongoose.Types.ObjectId;
    joinedAt?: Date;
    leftAt?: Date;
    status: string;
  }>;
  chat: mongoose.Types.ObjectId;
  status: string;
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
}

const callSchema = new Schema({
  type: { type: String, enum: ['voice', 'video'], required: true },
  caller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    joinedAt: Date,
    leftAt: Date,
    status: { type: String, default: 'calling' }
  }],
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  status: { type: String, default: 'ongoing' },
  startedAt: Date,
  endedAt: Date,
  duration: Number
});

export const Call = mongoose.model<ICall>('Call', callSchema);
