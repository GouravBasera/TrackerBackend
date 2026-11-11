import { body } from "express-validator";

export const updateProfileValidation = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters"),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("A valid email is required"),

  body().custom((_, { req }) => {
    if (!req.body.fullName && !req.body.email) {
      throw new Error("At least one field is required");
    }

    return true;
  }),
];
