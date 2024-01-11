import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { Product } from "../models/product.model";

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json(new ApiResponse(200, { products }));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

export const addproduct = asyncHandler(async (req, res) => {
  try {
    const { name, packSize, category, mrp, image, status } = req.body;
    if (!name || !packSize || !category || !mrp || !image || !status) {
      throw new ApiError(400, "Please provide all the required fields");
    }

    const newProduct = await Product.create({
      name,
      packSize,
      category,
      mrp,
      image,
      status,
    });

    if (!newProduct) {
      throw new ApiError(500, "Something went wrong when adding new product");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "New Product added successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new ApiError(400, "Category not found or doesn't exist");
    }

    await Product.findByIdAndDelete(productId);
    return res
      .status(201)
      .json(new ApiResponse(200, "Product deleted successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});
