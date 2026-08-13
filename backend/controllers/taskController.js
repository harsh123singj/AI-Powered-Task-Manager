import { createTask as createTaskService } from "../services/taskService.js";
import { getTask as getTaskService } from "../services/taskService.js";
import {getById as taskbyidassService} from "../services/taskService.js";
import { updateTask as updateTaskService } from "../services/taskService.js";
import { deleteTask as deleteTaskService } from "../services/taskService.js";


// create task
export const createTask = async (req, res,next) => {
    try {
        const savedTask= await createTaskService(req.body , req.user);
        res.status(201).json(savedTask)
    }
    catch (error) {
        next(error)
    }
}

// get all tasks

export const getTasks = async (req, res,next) => {
    try {
        const allTasks = await getTaskService(req.user);
        res.status(200).json(allTasks);
    }
    catch (error) {
        next(error)
    }
}

// get single task by id

export const getTaskbyId = async (req, res, next) => {
    try {
        const taskbyid = await taskbyidassService(req.params.id,req.user);

        if (!taskbyid) {
            return res.status(404).json({
                message: "No Task found with this id"
            })
        }

        res.status(200).json(taskbyid);
    }
    catch (error) {
        next(error);
    }
};

// update task 

export const UpdateTask = async (req, res, next) => {
    try {
        const updatedTask = await updateTaskService(req.params.id, req.body, req.user);

          if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(updatedTask)
    }
    catch (error) {
        next(error);
    }
};

// Delete any Tasks

export const deleteTask = async(req, res, next)=>{
    try{
       const deletedtask= await deleteTaskService(req.params.id, req.user);

       if(!deletedtask){
          return res.status(404).json({
          message:"Task not found"
        })
       }

       res.status(200).json({
        message:"Task deleted succesfully"
       })


    }
    catch(error){
        next(error)
    }
}