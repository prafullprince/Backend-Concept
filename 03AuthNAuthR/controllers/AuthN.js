const User = require("../models/AuthModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const OTP = require("../models/OtpModel");

exports.sendOtp = async (req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.json({
                success:false,
                message:"user is already present",
            });
        }
        // otp generate
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        // check otp is unique or not
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {
            email,otp
        }

        // create an entry in db for otp
        const otpBody = await OTP.create(otpPayload);

        return res.json({
            success:true,
            message:"otp sent successfully",
        });



    }
    catch(error){
        console.log(error);
    }
}


exports.userSignUpAuthn = async (req,res)=>{
    try{
        // fetch data from req ki body entered by user
        const {name,email,phoneNum,password,role,otp} = req.body;
        // check user is valid or not
        const alreadyUser = await User.findOne({email});
        if(alreadyUser){
            res.json({
                success:false,
                message:"user is already registered",
            });
        }

        // find most recent otp from db
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // validate otp
        if(otp.length == 0){
            return res.json({
                success:false,
                message:"otp not found",
            });
        }
        else if(otp !== recentOtp.otp){
            return res.json({
                success:false,
                message:"Otp is not correct"
            });
        }
        

        // if user is not already registered then hashed the password
        try{
            let hashedPassword = await bcrypt.hash(password,10);
            // create this user into database
            const newUser = User.create({
                email,
                password:hashedPassword,
                role
            });
            res.json({
                success:true,
                data:newUser
            })
        }catch(error){
            throw new Error("something went wrogn during hashing the password");
        }

    }catch(error){
        throw new Error("somethin went wrogn");
    }
};

exports.userLoginAuthn = async (req,res)=>{
    try{
        // fetch data from users
        const {email,password} = req.body;


        // validation of data
        if(!email || !password){
            return res.json({
                success:false,
                message:"please fill all details",
            });
        }
        // check user is correct or not
        let existingUser = await User.findOne({email});
        if(!existingUser){
            return res.json({
                success:false,
                message:"user is not available",
            });
        }


        // check password is matched or not
        // we use bcrypt.compare(1,2) -> it takes 2 arguments = 1>> req.body wala password & 2>> jouser database mn hai uss user ka password
        let passVerification = await bcrypt.compare(password, existingUser.password);


        // making payload(user ka data)
        const payload = {
            email:existingUser.email,
            id:existingUser._id,
            role:existingUser.role,
        }


        if(passVerification){
            // password match kr gaya === jwt client/user ko dedo
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            existingUser = existingUser.toObject();
            existingUser.token = token;
            // we have to protect our user password
            existingUser.password = undefined; 

            
            // create options
            const options = {
                expiresIn: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            // now create cookie and send data using cookie
            res.cookie("princeCookie",token,options).status(200).json({
                success:true,
                token,
                existingUser,
                message:"a user logged in successfully"
            });
        }else{
            // password match nhi hua
            return res.json({
                success:false,
                message:"Password Incorrect",
            })
        }
    }catch(error){
        console.log(error);
    }
}