import {Router} from "express";
import { loginValidation, registerValidation } from "./auth.validation.js";
import { validationRequest } from "../../middleware/validateRequest.middleware.js";
import { loginUser, registerUser } from "./auth.controller.js"
import { verifyJWT } from "../../middleware/auth.middleware.js";

const app = Router();

app.post("/register", registerValidation, validationRequest, registerUser)
app.post("/login", loginValidation, validationRequest, loginUser)
app.get("/profile", verifyJWT, (req, res)=>{
    res.json({
        success: true,
        data: req.user
    })
})

export default app;