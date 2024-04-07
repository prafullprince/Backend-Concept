const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        Expires:5*60,       
    }
});

// function  to send verification email
// function ke input mn do ki kisko mail bhejna hai aur kis otp ke sath bhejna
async function sendVerificationMail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Mail from Prafull Prince",otp);

    }
    catch(error){
        console.log(error);
    }
}


otpSchema.pre("save",async function(next){
    // send current object ki email and send current object ki otp
    await sendVerificationMail(this.email,this.otp);
    next();
})




module.exports = new mongoose.model("OTP",otpSchema);