import { User } from "../models/user.model";
import { IAuthInfoRequest } from "../types/express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = verify(token, accessTokenSecret);
    const user = await User.findById((decodedToken as JwtPayload)?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    (req as IAuthInfoRequest).user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
