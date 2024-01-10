import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { IAuthInfoRequest } from "../types/express";
import { Category } from "../models/category.model";

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const userId = (req as IAuthInfoRequest).user._id;
    const categories = await Category.find({ user: userId });
    return res.status(201).json(new ApiResponse(200, { categories }));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

export const addCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const userId = (req as IAuthInfoRequest).user._id;

    if (!name || !description || !status) {
      throw new ApiError(400, "Please provide all the required fields");
    }

    const newCategory = await Category.create({
      name,
      description,
      status,
      user: userId,
    });

    if (!newCategory) {
      throw new ApiError(500, "Something went wrong when adding new category");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, "New Category added successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const userId = (req as IAuthInfoRequest).user._id;

    const category = await Category.findOne({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      throw new ApiError(400, "Category not found or doesn't exist");
    }

    await Category.findByIdAndDelete(categoryId);

    return res
      .status(201)
      .json(new ApiResponse(200, "Category deleted successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
});
