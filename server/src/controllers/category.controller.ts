import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { Category } from "../models/category.model";

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(new ApiResponse(200, { categories }));
  } catch (error: any) {
    throw new ApiError(500, error);
  }
});

export const addCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !description || !status) {
      throw new ApiError(400, "Please provide all the required fields");
    }

    const newCategory = await Category.create({
      name,
      description,
      status,
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
    const { categoryId } = req.body;

    const category = await Category.findById(categoryId);

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
