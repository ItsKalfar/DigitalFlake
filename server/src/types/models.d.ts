import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string | null;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isPasswordCorrect: (password: string) => boolean;
  generateTemporaryToken: () => {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  };
}

export interface ICategories extends Document {
  name: string;
  description: string;
  status: string;
}
export interface IProducts extends Document {
  name: string;
  packSize: string;
  category: string;
  mrp: string;
  image: string;
  status: string;
}
