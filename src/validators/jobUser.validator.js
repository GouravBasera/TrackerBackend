
import { body } from "express-validator";

export const createJobProfileValidator = [
  body("userId")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("headline")
    .trim()
    .notEmpty()
    .withMessage("Headline is required")
    .isLength({ min: 5, max: 150 })
    .withMessage("Headline must be between 5 and 150 characters"),

  body("yearsOfExperience")
    .notEmpty()
    .withMessage("Years of experience is required")
    .isFloat({ min: 0, max: 60 })
    .withMessage("Experience must be between 0 and 60 years")
    .toFloat(),

  body("targetRoles")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Maximum 20 target roles allowed"),

  body("targetRoles.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Target roles cannot be empty"),

  body("prefferedLocations")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Maximum 20 preferred locations allowed"),

  body("prefferedLocations.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Preferred locations cannot be empty"),

  body("remotePreference")
    .optional()
    .isIn(["REMOTE", "HYBRID", "ONSITE", "ANY"])
    .withMessage("Invalid remote preference"),

  body("minExpectedSalary")
    .notEmpty()
    .withMessage("Expected salary is required")
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number")
    .toFloat(),

  body("currency")
    .optional()
    .isISO4217()
    .withMessage("Invalid currency code"),

  body("scoringWeights")
    .optional()
    .isObject()
    .withMessage("Scoring weights must be an object"),

  body("scoringWeights.*")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Each scoring weight must be between 0 and 100")
    .toFloat(),

  body("scoringWeights").custom((weights) => {
    if (!weights) return true;

    const allowedKeys = [
      "skills",
      "experience",
      "responsibilities",
      "education",
      "preferences",
    ];

    const keys = Object.keys(weights);

    if (keys.some((key) => !allowedKeys.includes(key))) {
      throw new Error("Invalid scoring weight property");
    }

    const total = allowedKeys.reduce(
      (sum, key) => sum + (weights[key] ?? 0),
      0
    );

    if (total !== 100) {
      throw new Error("Scoring weights must add up to 100");
    }

    return true;
  }),
];