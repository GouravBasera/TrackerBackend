import {Router} from "express";
import { registerValidation } from "./auth.validation.js";
import { validationRequest } from "../../middleware/validateRequest.middleware.js";

const app = Router();

app.post("/register", registerValidation, validationRequest)

export default app;