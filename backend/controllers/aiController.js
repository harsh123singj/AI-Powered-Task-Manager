import { generateAIResponse } from "../services/aiServices.js";


export const generateResponse = async (req, res, next)=>{

    try{
    const response = await generateAIResponse(req.body.text , req.user);

    res.status(200).json(response);
    }
    catch(error){
        next(error);
    }
}