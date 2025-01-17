import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
