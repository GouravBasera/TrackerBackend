import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from './modules/auth/auth.route.js'

const app = express();

app.use(express.json())

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({status: "Ok"})
})

app.use("/api/v1/auth", authRoutes)

app.use(errorMiddleware);

export default app;