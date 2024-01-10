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
exports.deleteProduct = exports.addproduct = exports.getAllProducts = void 0;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const product_model_1 = require("../models/product.model");
exports.getAllProducts = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const products = yield product_model_1.Product.find({ user: userId });
        return res.status(201).json(new ApiResponse_1.ApiResponse(200, { products }));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
exports.addproduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { name, packSize, category, mrp, image, status } = req.body;
        if (!name || !packSize || !category || !mrp || !image || !status) {
            throw new ApiError_1.ApiError(400, "Please provide all the required fields");
        }
        const newProduct = yield product_model_1.Product.create({
            name,
            packSize,
            category,
            mrp,
            image,
            status,
            user: userId,
        });
        if (!newProduct) {
            throw new ApiError_1.ApiError(500, "Something went wrong when adding new product");
        }
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(200, "New Product added successfully"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
exports.deleteProduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const userId = req.user._id;
        const product = yield product_model_1.Product.findOne({ _id: productId, user: userId });
        if (!product) {
            throw new ApiError_1.ApiError(400, "Category not found or doesn't exist");
        }
        yield product_model_1.Product.findByIdAndDelete(productId);
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(200, "Product deleted successfully"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
