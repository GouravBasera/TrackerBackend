import {Router} from "express";
import { loginValidation, registerValidation } from "../validators/auth.validator.js";
import { validationRequest } from "../middleware/validateRequest.middleware.js";
import { deleteCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteAccountValidation } from "../validators/user.validator.js";

const app = Router();

app.post("/register", registerValidation, validationRequest, registerUser)
app.post("/login", loginValidation, validationRequest, loginUser)
app.get("/profile", verifyJWT, (req, res)=>{
    res.json({
        success: true,
        data: req.user
    })
})
app.post("/logout", verifyJWT, validationRequest, logoutUser)
app.delete("/me", verifyJWT, deleteAccountValidation, validationRequest, deleteCurrentUser)

export default app;