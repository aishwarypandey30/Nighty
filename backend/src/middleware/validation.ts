import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray({ min: 1 })
    .withMessage("Cuisines must be a non-empty array"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price must be a positive number"),
];

// common error handler middleware:
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
