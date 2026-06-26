import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  customStatus?: string;
  lastSeen: Date;
  isVerified: boolean;
  isAdmin: boolean;
  googleId?: string;
  role: 'user' | 'admin' | 'superadmin';
  privacy: {
    lastSeen: 'everyone' | 'contacts' | 'nobody';
    profilePhoto: 'everyone' | 'contacts' | 'nobody';
    status: 'everyone' | 'contacts' | 'nobody';
  };
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
