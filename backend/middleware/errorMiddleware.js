// error middle ware have four params

const errorMiddleware= (err, req, res, next)=>{
    console.log("Error:",err.message);

        // Duplicate email / unique field error
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Email already registered"
        });
    }

    const statusCode= err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Interval server error"
    });
};

export default errorMiddleware;