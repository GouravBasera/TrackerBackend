import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js"
import { createTodoValidator, createNoteValidator } from "../validators/notes.validator.js";
import {validationRequest} from "../middleware/validateRequest.middleware.js";
import { createNote, createTodo } from "../controllers/notes.controller.js";

const app = Router()

app.get("/create-note", verifyJWT, createNoteValidator, validationRequest, createNote)

export default app