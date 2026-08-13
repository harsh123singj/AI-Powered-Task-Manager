import taskSchemajoi from "../validators/taskValidators.js";

const validateTask =(req , res, next)=>{
    const validatedTask=taskSchemajoi.validate(req.body);

    if(validatedTask.error){
        res.status(400).json({
            success: false,
            message: validatedTask.error.message
        })
    }

    next();
}

export default validateTask;