import { body } from "express-validator";

export const addCategoryValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("status").trim().notEmpty().withMessage("Status is required"),
  ];
};

export const deleteCategoryValidationRules = () => {
  return [
    body("categoryId").trim().notEmpty().withMessage("Product Id is required"),
  ];
};
