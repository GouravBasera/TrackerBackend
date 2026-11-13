import { body, checkExact } from "express-validator";

export const roadMapCreationValidation = [
    checkExact([
        body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

        body("skills")
        .notEmpty()
        .withMessage("Skills are required to create roadmap")
    ], {message: "Unexpected Fields in the body"})
]

export const skillsCreationValidation = [
    checkExact([
            body("title")
            .trim()
            .notEmpty()
            .withMessage("Title is required")
    ], {message: "Unexpected Fields in the body"})
]