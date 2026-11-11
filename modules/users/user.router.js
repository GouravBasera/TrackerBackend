import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { getCurrentUser, updateCurrentUser } from "./user.controller.js";
import { updateProfileValidation } from "./user.validation.js";

const app = Router()

app.get("/me", verifyJWT, getCurrentUser)
app.patch("/me", verifyJWT, updateProfileValidation, updateCurrentUser)

export default app