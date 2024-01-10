import { body } from "express-validator";

export const addProductValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("packSize").trim().notEmpty().withMessage("Pack Size is required"),
    body("mrp").notEmpty().withMessage("Price is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("image").trim().notEmpty().withMessage("Image is required"),
    body("status").trim().notEmpty().withMessage("Status is required"),
  ];
};

export const deleteProductValidationRules = () => {
  return [
    body("productId").trim().notEmpty().withMessage("Product Id is required"),
  ];
};
