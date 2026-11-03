import {Router} from "express";
import { registerValidation } from "./auth.validation.js";
import { validationRequest } from "../../middleware/validateRequest.middleware.js";
import { registerUser } from "./auth.controller.js"

const app = Router();

app.post("/register", registerValidation, validationRequest, registerUser)

export default app;