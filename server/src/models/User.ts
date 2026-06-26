import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
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
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String },
  bio: { type: String, maxlength: 160 },
  status: { type: String, enum: ['online', 'offline', 'away', 'busy'], default: 'offline' },
  customStatus: { type: String, maxlength: 100 },
  lastSeen: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String, sparse: true, unique: true },
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  privacy: {
    lastSeen: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' },
    profilePhoto: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' },
    status: { type: String, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone' }
  }
}, { timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
