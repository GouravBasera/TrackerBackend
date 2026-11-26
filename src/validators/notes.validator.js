import { body, checkExact } from "express-validator";

export const createNoteValidator = [
    checkExact([
    body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .trim(),

    body("description")
    .optional()
    .trim(),

    body("todo")
    .optional()
    ], {message: "Unexpected fields"})
]

export const createTodoValidator = [
    checkExact([
        body("title")
        .notEmpty()
        .withMessage("Title cannot be empty")
        .trim(),

        body("status")
        .notEmpty()
        .withMessage("Status cannot be empty")
    ], {message: "Unexpecte Fields"})
]

export const updateTodoValidator = [
    checkExact([
        body("title")
        .optional()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .trim(),

        body("status")
        .optional()
        .notEmpty()
        .withMessage("Status cannot be empty")
    ], {message: "Unexpecte Fields"})
]