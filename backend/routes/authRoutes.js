import { CreateUser,loginUser } from "../controllers/authController.js";

import express from "express";
import validateRegister from "../middleware/validateRegister.js";
import validateLogin from "../middleware/ValidateLogin.js";

const authrouter = express.Router();

authrouter.post("/register",validateRegister, CreateUser);
authrouter.post("/login", validateLogin, loginUser );

export default authrouter;