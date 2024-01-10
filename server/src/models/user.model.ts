import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import validator from "validator";
import { Schema, model } from "mongoose";
import { IUser } from "../types/models";
import { AvailableUserRoles, UserRolesEnum } from "../constants";

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email address",
      },
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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
  return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const user = model<IUser>("User", userSchema);
