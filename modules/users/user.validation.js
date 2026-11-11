import { body } from "express-validator";

export const userValidation = [
    body("fullName")
      .trim()
      .optional()
      .isLength({ min: 2 })
      .withMessage("Full name must be at least 2 characters"),

    body("email")
      .trim()
      .optional()
      .isEmail()
      .withMessage("A valid email is required"),
  ];