import express from "express";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRoutes from './src/routes/auth.route.js'
import userRoutes from "./src/routes/user.router.js";

const app = express();

app.use(express.json())

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({status: "Ok"})
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)

app.use(errorMiddleware);

export default app;