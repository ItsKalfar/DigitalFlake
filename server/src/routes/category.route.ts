import { Router } from "express";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../controllers/category.controller";

import {
  addCategoryValidationRules,
  deleteCategoryValidationRules,
} from "../validators/category.validator";

const router = Router();

router.route("/getCategory").get(getAllCategories);
router.route("/addCategory").post(addCategoryValidationRules(), addCategory);
router
  .route("/deleteCategory")
  .delete(deleteCategoryValidationRules(), deleteCategory);
