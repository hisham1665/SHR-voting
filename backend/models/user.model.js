import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required:true,
    },
    SR_NO:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    class:{
        type:String,
    },
}, {
    timestamps:true
})

const Users = mongoose.model('Users' , userSchema );
export default Users;

//