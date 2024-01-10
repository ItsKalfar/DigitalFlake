"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidationRules = exports.addCategoryValidationRules = void 0;
const express_validator_1 = require("express-validator");
const addCategoryValidationRules = () => {
    return [
        (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
        (0, express_validator_1.body)("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required"),
        (0, express_validator_1.body)("status").trim().notEmpty().withMessage("Status is required"),
    ];
};
exports.addCategoryValidationRules = addCategoryValidationRules;
const deleteCategoryValidationRules = () => {
    return [
        (0, express_validator_1.body)("categoryId").trim().notEmpty().withMessage("Product Id is required"),
    ];
};
exports.deleteCategoryValidationRules = deleteCategoryValidationRules;
