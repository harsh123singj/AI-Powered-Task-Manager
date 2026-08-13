const requestCheck =(req, res, next) =>{
    console.log("Task route accessed");
    next();
}

export default requestCheck;