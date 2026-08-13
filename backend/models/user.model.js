import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true,
        Selection: false
    }
}, {timeStamp: true});


const User = mongoose.model('users', UserSchema);

export default User;