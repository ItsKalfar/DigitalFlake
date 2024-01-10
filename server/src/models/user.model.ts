import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import validator from "validator";
import { Schema, model } from "mongoose";
import { IUser } from "../types/models";
import { AvailableUserRoles, UserRolesEnum } from "../constants";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY!;
const refreshAccessTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
const refreshAccessTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY!;

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email address",
      },
      required: [true, "Please prvide your email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password shouild be atleast 8 charcters"],
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  if (!password || !this.password) {
    return false;
  }
  return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return sign(
    {
      _id: this._id,
    },
    refreshAccessTokenSecret,
    { expiresIn: refreshAccessTokenExpiry }
  );
};

export const User = model<IUser>("User", userSchema);
