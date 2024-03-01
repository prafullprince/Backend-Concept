const express = require("express");
const router = express.Router();


// import controllers
const {userSignUpAuthn} = require("../controllers/AuthN");
const {userLoginAuthn} = require("../controllers/AuthN");

// import middlewares
const {auth,isStudent,isAdmin} = require("../middlewares/authn");


// making routes
router.post("/signup",userSignUpAuthn);
router.post("/login",userLoginAuthn);

// protected routes 
// ismn humein batana prega ki kaun kaun sa middleware use hoga
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for student",
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for admin",
    });
});


// export
module.exports = router;