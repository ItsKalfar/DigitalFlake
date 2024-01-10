"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const category_validator_1 = require("../validators/category.validator");
const router = (0, express_1.Router)();
router.route("/getCategory").get(category_controller_1.getAllCategories);
router.route("/addCategory").post((0, category_validator_1.addCategoryValidationRules)(), category_controller_1.addCategory);
router
    .route("/deleteCategory")
    .delete((0, category_validator_1.deleteCategoryValidationRules)(), category_controller_1.deleteCategory);
exports.default = router;
