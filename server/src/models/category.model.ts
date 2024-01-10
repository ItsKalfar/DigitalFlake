import { Schema, model } from "mongoose";
import { CategoryStatus } from "../constants";
import { ICategories } from "../types/models";

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
  },
  { timestamps: true }
);

export const category = model<ICategories>("Category", categorySchema);
