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
        enum:["Student","Admin","Public"],
    },
    otp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OTP",
    }
});
module.exports = mongoose.model("User",userSchema);