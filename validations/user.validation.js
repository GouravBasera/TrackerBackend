import { body, checkExact } from "express-validator";

export const updateProfileValidation = [
  checkExact([
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
      const hasFullName = req.body.fullName !== undefined;
      const hasEmail = req.body.email !== undefined;

      if(!hasFullName && !hasEmail){
        throw new Error("At least one field is required")
      }

      return true;

    }),
  ], {
    message: "Unexpected fields in request body",
  }),
];

export const updatePasswordValidation = [
  checkExact([
    body("currentPassword")
      .notEmpty()
      .withMessage("Current Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required")
      .isLength({ min: 8 })
      .withMessage("New Password must be at least 8 characters"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required"),

    body().custom((_, { req }) => {
      if (req.body.newPassword !== req.body.confirmPassword) {
        throw new Error("New Password and Confirm Password do not match");
      }

      return true;
    }),
  ], {
    message: "Unexpected fields in request body",
  }),
];

export const deleteAccountValidation = [
  checkExact(
    [
      body("password")
        .notEmpty()
        .withMessage("Password is required to delete the account")
        .isLength()
        .withMessage("Password must be at least 8 characters"),
    ],
    {
      message: "Unexpected fields in request body",
    },
  ),
];