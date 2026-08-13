import express from "express";
import { createTask, getTasks , getTaskbyId , UpdateTask, deleteTask} from "../controllers/taskController.js";
import validateTask from "../middleware/validateTask.js";
import authMiddleware from "../middleware/authMiddleware.js";

const taskrouter= express.Router();
taskrouter.post("/",validateTask,authMiddleware, createTask );
taskrouter.get("/",authMiddleware, getTasks);
taskrouter.get("/:id",authMiddleware, getTaskbyId);
taskrouter.put("/:id",validateTask,authMiddleware,UpdateTask);
taskrouter.delete("/:id",authMiddleware, deleteTask)

export default taskrouter;

