import { Router } from "express";
import {
  getAllProducts,
  addproduct,
  deleteProduct,
} from "../controllers/product.controller";

import {
  addProductValidationRules,
  deleteProductValidationRules,
} from "../validators/product.validator";

const router = Router();

router.route("/get_all_products").get(getAllProducts);
router.route("/add_product").post(addProductValidationRules(), addproduct);
router
  .route("/delete_product")
  .delete(deleteProductValidationRules(), deleteProduct);

export default router;
