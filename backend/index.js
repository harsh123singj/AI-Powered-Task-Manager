import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import loggerMiddleware from "./middleware/loggerMiddleware.js";
import requestCheck from "./middleware/requestCheck.js";
import secondMiddleware from "./middleware/secondMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

import taskrouter from "./routes/taskRoutes.js";
import authrouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();

const PORT = process.env.PORT || 4002;


// Global middleware

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);


// Routes

app.use("/api/tasks", taskrouter);
app.use("/api/auth", authrouter);
app.use("/api/ai", aiRouter);


// Test routes

app.get("/", (req, res) => {
    res.json({
        message: "Task management APP is running"
    });
});

app.get("/task", requestCheck, secondMiddleware, (req, res) => {
    res.status(200).json({
        message: "Task route"
    });
});

app.get("/error", (req, res, next) => {
    const error = new Error("Something went wrong");
    next(error);
});


// Error handling middleware

app.use(errorMiddleware);


// Start server after MongoDB connection

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();