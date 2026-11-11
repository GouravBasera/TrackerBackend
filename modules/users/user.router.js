import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { getCurrentUser } from "./user.controller.js";

const app = Router()

app.get("/me", verifyJWT, getCurrentUser)

export default app