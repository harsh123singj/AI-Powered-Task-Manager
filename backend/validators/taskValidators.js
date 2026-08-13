import Joi from "joi";

const taskSchemajoi = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required().valid("pending", "in-progress", "completed"),
    priority: Joi.string()
        .valid("low", "medium", "high")
        .required(),
    dueDate: Joi.date().optional()
})

export default taskSchemajoi;