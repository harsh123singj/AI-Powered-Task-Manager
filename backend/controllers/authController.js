import { createUser as CreateUserService } from "../services/authService.js";
import { loginUser as loginUserService } from "../services/authService.js";

// create a new User here 

export const CreateUser= async (req, res,next) =>{
    try{
        await CreateUserService(req.body);

        res.status(201).json({
            message:"User Created Succesfully"
        });

    }
    catch(error){
        next(error)
    }
}


// Login user

export const loginUser =async(req, res, next)=>{
   try{ const loggedinUser = await loginUserService(req.body);
   
    res.status(200).json(loggedinUser);
   }
   catch(error){
    next(error);
   }

    
}