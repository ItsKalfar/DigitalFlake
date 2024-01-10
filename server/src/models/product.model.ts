import { Schema, model } from "mongoose";
import { ProductStatus } from "../constants";
import { IProducts } from "../types/models";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    packSize: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    mrp: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ProductStatus,
      required: true,
    },
  },
  { timestamps: true }
);

export const product = model<IProducts>("Products", productSchema);
