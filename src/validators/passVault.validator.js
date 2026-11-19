import { body, checkExact } from "express-validator";

export const passwordSaveValidation = [
  checkExact(
    [
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

      body("platformName")
        .trim()
        .notEmpty()
        .withMessage("Platform name cannot be empty")
        .isEmail()
        .withMessage("A valid email is required"),

      body("email")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("A valid email is required"),

      body("username")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("A valid email is required"),

      body().custom((_, { req }) => {
        const hasUsername = req.body.username !== undefined;
        const hasEmail = req.body.email !== undefined;

        if (!hasUsername && !hasEmail) {
          throw new Error("At least one field is required");
        }
        return true;
      }),
    ],
    { message: "Unexpected fields in request body" },
  ),
];
