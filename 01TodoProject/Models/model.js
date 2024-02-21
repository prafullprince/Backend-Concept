const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:40,
        },
        description:{
            type:String,
            required:true,
            maxLength:150,
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            required:true,
        },
        updatedAt:{
            type:Date,
            default:Date.now(),
            required:true,
        }
    }
);
module.exports = mongoose.model("TodoSchema",todoSchema);