import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create User 

export const createUser = async (userData) => {
    const hashPass = await bcrypt.hash(userData.password, 10);
    // exchanging orginial passs with hashpass
    userData.password = hashPass;
    const newuser = new User(userData);
    const SavedUser = await newuser.save();

    return SavedUser;

}


// Login LOgic here

export const loginUser = async (userData) => {
    // search for entered email
    const loggedinUser = await User.findOne({
        email: userData.email
    }).select("+password");
    
    if (!loggedinUser) {
        throw new Error("No user Found with the mail")
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(userData.password, loggedinUser.password)
    if (!isPasswordCorrect) {
        throw new Error("Wrong Password")
    }

    // assign token to user using jwt

    const token = jwt.sign(
        { userId: loggedinUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        userId: loggedinUser._id
    };
}