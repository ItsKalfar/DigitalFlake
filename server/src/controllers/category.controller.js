"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.addCategory = exports.getAllCategories = void 0;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const category_model_1 = require("../models/category.model");
exports.getAllCategories = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const categories = yield category_model_1.Category.find({ user: userId });
        return res.status(201).json(new ApiResponse_1.ApiResponse(200, { categories }));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
exports.addCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        const userId = req.user._id;
        if (!name || !description || !status) {
            throw new ApiError_1.ApiError(400, "Please provide all the required fields");
        }
        const newCategory = yield category_model_1.Category.create({
            name,
            description,
            status,
            user: userId,
        });
        if (!newCategory) {
            throw new ApiError_1.ApiError(500, "Something went wrong when adding new category");
        }
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(200, "New Category added successfully"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
exports.deleteCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.body;
        const userId = req.user._id;
        const category = yield category_model_1.Category.findOne({
            _id: categoryId,
            user: userId,
        });
        if (!category) {
            throw new ApiError_1.ApiError(400, "Category not found or doesn't exist");
        }
        yield category_model_1.Category.findByIdAndDelete(categoryId);
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(200, "Category deleted successfully"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
