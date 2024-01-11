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

router.route("/get_all_categories").get(getAllCategories);
router.route("/add_category").post(addCategoryValidationRules(), addCategory);
router
  .route("/delete_category")
  .delete(deleteCategoryValidationRules(), deleteCategory);

export default router;
