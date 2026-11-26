import { Router } from "express";
import { createJobProfileValidator } from "../validators/jobUser.validator.js";
import { validationResult } from "express-validator";
import { registerJobProfile } from "../controllers/jobApply.controller.js";
import verifyJWT from "../middleware/auth.middleware.js"

const app = Router()

app.post("/register", verifyJWT, createJobProfileValidator, validationResult, registerJobProfile)
app.post("/resumes")
app.get("/resumes")
app.get("/resumes/:id")
app.patch("/resumes/:id/parsed-data")
app.patch("/resumes/:id/primary")
app.delete("/resumes/:id")
app.post("/")
app.get("/")
app.get("/:id")
app.patch("/:id")
app.post("/:jobId/match")
app.post("/:jobId/recommend-resume")
app.post("/:jobId/matches")
app.post("/applications")
app.post("/applications/:id")
app.patch("/applications/:id/status")
app.post("/applications/:id/cover-letter")
app.post("/applications/:id/questions/answer")
app.patch("/applications/:id/documents/:docId")
app.get("/analytics/summary")

export default app;