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

router.route("/getProducts").get(getAllProducts);
router.route("/addProduct").post(addProductValidationRules(), addproduct);
router
  .route("/deleteProduct")
  .delete(deleteProductValidationRules(), deleteProduct);

export default router;
