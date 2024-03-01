const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNum:{
        type:Number,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["Student","Admin","Instructor"],
    }
});
module.exports = mongoose.model("User",userSchema);