const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    body:{
        type:String,
        required:true,
    }   
});

module.exports = mongoose.model("Comment",commentSchema); 