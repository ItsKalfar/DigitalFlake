"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_TEMPORARY_TOKEN_EXPIRY = exports.ProductStatus = exports.ProductStatusEnum = exports.CategoryStatus = exports.CategoryStatusEnum = exports.AvailableUserRoles = exports.UserRolesEnum = void 0;
exports.UserRolesEnum = {
    ADMIN: "ADMIN",
    USER: "USER",
};
exports.AvailableUserRoles = Object.values(exports.UserRolesEnum);
exports.CategoryStatusEnum = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
};
exports.CategoryStatus = Object.values(exports.CategoryStatusEnum);
exports.ProductStatusEnum = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
};
exports.ProductStatus = Object.values(exports.ProductStatusEnum);
exports.USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000;
