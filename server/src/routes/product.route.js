"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const product_validator_1 = require("../validators/product.validator");
const router = (0, express_1.Router)();
router.route("/getProducts").get(product_controller_1.getAllProducts);
router.route("/addProduct").post((0, product_validator_1.addProductValidationRules)(), product_controller_1.addproduct);
router
    .route("/deleteProduct")
    .delete((0, product_validator_1.deleteProductValidationRules)(), product_controller_1.deleteProduct);
exports.default = router;
