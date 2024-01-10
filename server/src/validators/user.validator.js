"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidator = exports.userRegisterValidator = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
const userRegisterValidator = () => {
    return [
        (0, express_validator_1.body)("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required"),
        (0, express_validator_1.body)("role")
            .optional()
            .isIn(constants_1.AvailableUserRoles)
            .withMessage("Invalid user role"),
    ];
};
exports.userRegisterValidator = userRegisterValidator;
const userLoginValidator = () => {
    return [
        (0, express_validator_1.body)("email").optional().isEmail().withMessage("Email is invalid"),
        (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    ];
};
exports.userLoginValidator = userLoginValidator;
