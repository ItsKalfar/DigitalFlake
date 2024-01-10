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
exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.registerUser = exports.generateAccessAndRefreshTokens = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("../constants");
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const generateAccessAndRefreshTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User Does not exists", []);
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
});
exports.generateAccessAndRefreshTokens = generateAccessAndRefreshTokens;
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        const existedUser = yield user_model_1.User.findOne({ email });
        if (existedUser) {
            throw new ApiError_1.ApiError(409, "User with email or username already exists", []);
        }
        const user = yield user_model_1.User.create({
            email,
            password,
            role: role || constants_1.UserRolesEnum.USER,
        });
        const createdUser = yield user_model_1.User.findById(user._id);
        if (!createdUser) {
            throw new ApiError_1.ApiError(500, "Something went wrong while registering the user");
        }
        return res
            .status(201)
            .json(new ApiResponse_1.ApiResponse(200, { user: createdUser }, "Users registered successfully"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, error.message);
    }
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError_1.ApiError(400, "Username or email is required");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.ApiError(400, "User does not exist");
    }
    if (user.email !== email) {
        throw new ApiError_1.ApiError(401, "Email didn't matched with your account");
    }
    const isPasswordValid = yield user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError_1.ApiError(401, "Invalid user credentials");
    }
    const { accessToken, refreshToken } = yield (0, exports.generateAccessAndRefreshTokens)(user._id);
    const loggedInUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse_1.ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
}));
exports.logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new ApiError_1.ApiError(404, "User Does not exists", []);
    }
    yield user_model_1.User.findByIdAndUpdate(user._id, {
        $set: {
            refreshToken: undefined,
        },
    }, { new: true });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse_1.ApiResponse(200, {}, "User logged out"));
}));
exports.refreshAccessToken = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError_1.ApiError(401, "Unauthorized request");
    }
    try {
        const decodedToken = (0, jsonwebtoken_1.verify)(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id);
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid refresh token");
        }
        if (incomingRefreshToken !== (user === null || user === void 0 ? void 0 : user.refreshToken)) {
            throw new ApiError_1.ApiError(401, "Refresh token is expired or used");
        }
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };
        const { accessToken, refreshToken: newRefreshToken } = yield (0, exports.generateAccessAndRefreshTokens)(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse_1.ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, (error === null || error === void 0 ? void 0 : error.message) || "Invalid refresh token");
    }
}));
