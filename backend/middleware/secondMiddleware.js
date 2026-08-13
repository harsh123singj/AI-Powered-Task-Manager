const secondMiddleware =(req, res, next)=>{
   console.log("Second middleware excuted");

   next();
}

export default secondMiddleware;