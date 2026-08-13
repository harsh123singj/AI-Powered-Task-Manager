import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import requestCheck from "./middleware/requestCheck.js";
import secondMiddleware from "./middleware/secondMiddleware.js";
import errorMiddleware  from "./middleware/errorMiddleware.js";
import taskrouter from "./routes/taskRoutes.js";
import authrouter from "./routes/authRoutes.js"

dotenv.config();

const app= express();
const PORT = process.env.PORT || 4002;

// Global middleware

app.use(cors())
app.use(express.json())
app.use(loggerMiddleware);

app.use("/api/tasks", taskrouter);
app.use("/api/auth", authrouter);
// router middleware

// error-handling middleware

// connect to MongoDB
connectDB();


// test route
app.get("/", (req , res) =>{
    res.json({
        message :"Task manangmnet APP is runnig"
    });
});

app.get("/task", requestCheck,secondMiddleware,(req, res)=>{
    res.status(200).json({
        message:"Task route"
    })
})

app.get("/error", (req, res,next)=>{
    const error= new Error("Something went wrong");
    next(error);
})

app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})