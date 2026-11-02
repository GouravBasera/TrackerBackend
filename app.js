import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json())
app.use(errorMiddleware);

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({status: "Ok"})
})

export default app;