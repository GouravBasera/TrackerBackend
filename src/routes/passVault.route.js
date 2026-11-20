import { Router } from "express";
import { generatePassword, saveEncryptedPassword, findPassword, deletePassword } from "../controllers/passVault.controller.js";
import { passwordSaveValidation, findPasswordValidation } from "../validators/passVault.validator.js";
import {validationRequest} from "../middleware/validateRequest.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const app = Router()

app.get("/generate-password", generatePassword)
app.post("/save-password", verifyJWT, passwordSaveValidation, validationRequest,saveEncryptedPassword)
app.get("/find-password", verifyJWT, findPasswordValidation, validationRequest, findPassword)
app.delete("/delete-password", verifyJWT, validationRequest, deletePassword)

export default app;