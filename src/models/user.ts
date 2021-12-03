import * as mongoose from 'mongoose';
import logger from 'morgan';
import { comparePassword, hashPassword } from '../utils/passwords';
import { APIDocument } from './interface';

const ADMIN = 'admin';
const USER = 'user';

const AccountTypes = [
  ADMIN,
  USER,
];

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: AccountTypes,
    default: USER,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Methods
// eslint-disable-next-line func-names
userSchema.methods.setPassword = function (password: string): Promise<boolean> {
  return hashPassword(password)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      return true;
    })
    .catch((error) => {
      logger(error);
      return false;
    });
};

// eslint-disable-next-line func-names
userSchema.methods.passwordEquals = function (password: string): Promise<boolean> {
  return comparePassword(password, this.password);
};

// eslint-disable-next-line func-names
userSchema.methods.response = function () {
  return {
    username: this.username,
    accountType: this.accountType,
  };
};

// Types
export interface UserDocument extends APIDocument {
  username: string;
  password: string;
  setPassword(password: string): Promise<boolean>;
  passwordEquals(password: string): Promise<boolean>;
}

export default mongoose.model<UserDocument>('User', userSchema);
