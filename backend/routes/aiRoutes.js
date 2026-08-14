import { generateResponse } from "../controllers/aiController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/test" ,authMiddleware, generateResponse);

export default aiRouter;

