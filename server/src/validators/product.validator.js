"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductValidationRules = exports.addProductValidationRules = void 0;
const express_validator_1 = require("express-validator");
const addProductValidationRules = () => {
    return [
        (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
        (0, express_validator_1.body)("packSize").trim().notEmpty().withMessage("Pack Size is required"),
        (0, express_validator_1.body)("mrp").notEmpty().withMessage("Price is required"),
        (0, express_validator_1.body)("category").trim().notEmpty().withMessage("Category is required"),
        (0, express_validator_1.body)("image").trim().notEmpty().withMessage("Image is required"),
        (0, express_validator_1.body)("status").trim().notEmpty().withMessage("Status is required"),
    ];
};
exports.addProductValidationRules = addProductValidationRules;
const deleteProductValidationRules = () => {
    return [
        (0, express_validator_1.body)("productId").trim().notEmpty().withMessage("Product Id is required"),
    ];
};
exports.deleteProductValidationRules = deleteProductValidationRules;
