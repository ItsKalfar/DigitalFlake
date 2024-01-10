"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const user_model_1 = require("./user.model");
const categorySchema = new mongoose_1.Schema({
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
        enum: constants_1.CategoryStatus,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
        required: true,
    },
}, { timestamps: true });
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
