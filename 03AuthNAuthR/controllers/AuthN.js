const User = require("../models/AuthModels");
const bcrypt = require("bcrypt");

exports.userSignUpAuthn = async (req,res)=>{
    try{
        // fetch data from req ki body entered by user
        const {name,email,phoneNum,password,role} = req.body;
        // check user is valid or not
        const alreadyUser = await User.findOne({email});
        if(alreadyUser){
            res.json({
                success:false,
                message:"user is already registered",
            });
        }
        // if user is not already registered then hashed the password

        try{
            let hashedPassword = await bcrypt.hash(password,10);
            // create this user into database
            const newUser = User.create({
                email,
                password:hashedPassword
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