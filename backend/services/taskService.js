import Task from "../models/Task.model.js";

// Create Tasks Logic Here
export const createTask = async (taskData, userId) => {
    const newTask = new Task({
        ...taskData,
        user: userId
    });

    const savedTask = await newTask.save();

    return savedTask;
};

// Get allTasks logic here
export const getTask = async (userId) => {
    const allTasks = await Task.find({ user: userId });
    return allTasks;
}

// GET task by id logic here

export const getById = async (id, userId) => {
    const taskById = await Task.findOne({
        _id: id,
        user: userId
    });

    return taskById;
}

// update Task logic here

export const updateTask = async (id, taskData, userId) => {
    const updatedTask = await Task.findOneAndUpdate({
        _id: id,
        user: userId
    }, taskData, {
        new: true,
        runValidators: true
    });

    return updatedTask;
}

// Dlete Task Logic here

export const deleteTask = async (id, userId) => {
    const deletedTask = await Task.findOneAndDelete({
        _id:id,
        user:userId
    });

    return deletedTask;
}