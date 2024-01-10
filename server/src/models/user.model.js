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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "Invalid email address",
        },
        required: [true, "Please prvide your email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "Password shouild be atleast 8 charcters"],
        select: false,
    },
    role: {
        type: String,
        enum: constants_1.AvailableUserRoles,
        default: constants_1.UserRolesEnum.USER,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield (0, bcrypt_1.hash)(this.password, 10);
        next();
    });
});
userSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.compare)(password, this.password);
    });
};
userSchema.methods.generateAccessToken = function () {
    return (0, jsonwebtoken_1.sign)({
        _id: this._id,
        email: this.email,
        role: this.role,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
userSchema.methods.generateRefreshToken = function () {
    return (0, jsonwebtoken_1.sign)({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
