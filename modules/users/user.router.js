import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { getCurrentUser } from "./user.controller.js";

const router = Router()

router.get("/me", verifyJWT, getCurrentUser)

export default router