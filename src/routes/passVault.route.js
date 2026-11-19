import { Router } from "express";
import { generatePassword, savePassword } from "../controllers/passVault.controller.js";
import { passwordSaveValidation } from "../validators/passVault.validator.js";
import { validationResult } from "express-validator";

const app = Router()

app.get("/generate-password", generatePassword)
app.post("/save-password", passwordSaveValidation, validationResult, savePassword)

export default app;