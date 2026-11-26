import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js"
import { createTodoValidator, createNoteValidator, updateTodoValidator } from "../validators/notes.validator.js";
import {validationRequest} from "../middleware/validateRequest.middleware.js";
import { createNote, createTodo, updateNote } from "../controllers/notes.controller.js";
import { deleteTodo } from "../controllers/todo.controller.js";

const app = Router()

app.get("/create-note", verifyJWT, createNoteValidator, validationRequest, createNote)
app.get("/update-note",  verifyJWT, updateTodoValidator, validationRequest, updateNote)
app.get("/delete-note",  verifyJWT, deleteTodo)

export default app