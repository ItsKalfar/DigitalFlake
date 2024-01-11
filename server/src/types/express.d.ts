import { Request } from "express";
import { IUser } from "./models";

export interface IAuthInfoRequest extends Request {
  user: any;
}
