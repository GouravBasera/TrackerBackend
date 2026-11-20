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
                .withMessage("Platform name cannot be empty"),

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
                .withMessage("Username cannot be empty"),

            body().custom((_, { req }) => {
                const hasUsername = !!req.body.username?.trim();
                const hasEmail = !!req.body.email?.trim();

                if (!hasUsername && !hasEmail) {
                    throw new Error(
                        "At least one of username or email is required"
                    );
                }

                return true;
            }),
        ],
        { message: "Unexpected fields in request body" }
    ),
];


export const findPasswordValidation = [
    checkExact(
        [
            body("platformName")
            .optional()
            .trim(),

            body("username")
                .optional()
                .trim()
                .notEmpty()
                .withMessage("Username cannot be empty"),


            body("email")
                .optional()
                .trim()
                .notEmpty()
                .withMessage("Email cannot be empty")
                .isEmail()
                .withMessage("A valid email is required"),

            body().custom((_, { req }) => {
                const hasUsername = !!req.body.username?.trim();
                const hasEmail = !!req.body.email?.trim();
                const hasPlatformName = !!req.body.email?.trim();

                if (!hasUsername && !hasEmail && !hasPlatformName) {
                    throw new Error(
                        "At least one of field is required"
                    );
                }

                return true;
            }),
        ],
        { message: "Unexpected fields in request body" }
    ),
];
