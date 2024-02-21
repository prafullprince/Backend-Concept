const mongoose = require("mongoose");

const likeModel = new mongoose.Schema({
    userName:{
        type:String,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }
})
module.exports = mongoose.model("Like",likeModel);