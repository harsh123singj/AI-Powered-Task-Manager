import loginSchema from "../validators/loginValidator.js";

const validateLogin = (req, res, next) => {
    const validatedUser = loginSchema.validate(req.body);

    if (validatedUser.error) {
        return res.status(400).json({
            success: false,
            message: validatedUser.error.message
        });
    }

    next();
};

export default validateLogin;