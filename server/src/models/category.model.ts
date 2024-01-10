import { Schema, model } from "mongoose";
import { CategoryStatus } from "../constants";
import { ICategories } from "../types/models";
import { User } from "./user.model";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: CategoryStatus,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategories>("Category", categorySchema);
