import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { changePassword, getCurrentUser, updateCurrentUser } from "./user.controller.js";
import { updatePasswordValidation, updateProfileValidation } from "./user.validation.js";
import { validationRequest } from "../../middleware/validateRequest.middleware.js";

const app = Router()

app.get("/me", verifyJWT, getCurrentUser)
app.patch("/me", verifyJWT, updateProfileValidation, updateCurrentUser)
app.patch("/change-password", verifyJWT, updatePasswordValidation, validationRequest, changePassword)

export default app