import registerSchema from "../validators/authValidators.js";

const validateRegister =(req, res, next)=>{
    const validatedUser= registerSchema.validate(req.body);

    if(validatedUser.error){
        return res.status(400).json({
            success: false,
            message: validatedUser.error.message
        })
    }
    next();
}

export default validateRegister;