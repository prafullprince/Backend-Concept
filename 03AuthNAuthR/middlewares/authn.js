// auth , isStudent and isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.auth = (req,res,next)=>{
    try{
        // extract jwt token
        const token = req.body.token;
        if(!token){
            return res.json({
                success:false,
                message:"token not found",
            });
        }

        // verify the token
        try{
            // is decode data mn hum user ka sara data dekhenge 
            const payload = jwt.verify(token,process.env.JWT_SECRET);

            req.existingUser = payload;
        }catch(error){
            console.log(error);
        }
        next();

    }catch(error){
        console.log(error);
    }
};

exports.isStudent = (req,res,next)=>{
    try{
        if(req.existingUser.role !== "Student"){
            return res.json({
                success:false,
                message:"you are not authorized here",
            });
        }
        next();
    }catch(error){
        console.log(error);
    }
};

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.existingUser !== "Admin"){
            return res.json({
                success:false,
                message:"you are not allowed here",
            });
        }
    }catch(error){
        console.log(error);
    }
};