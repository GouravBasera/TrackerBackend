import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { validationRequest } from "../../middleware/validateRequest.middleware.js";
import { getAllRoadmaps, getRoadmapById } from "./learning.controller.js";

const app = Router()

app.get("/roadmaps", verifyJWT, validationRequest, getAllRoadmaps)
app.get("/roadmaps:roadmapId", verifyJWT, validationRequest, getRoadmapById)

export default app