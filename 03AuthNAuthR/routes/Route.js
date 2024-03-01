const express = require("express");
const router = express.Router();


// import controllers
const {userSignUpAuthn} = require("../controllers/AuthN");
const {userLoginAuthn} = require("../controllers/AuthN");


// making routes
router.post("/signup",userSignUpAuthn);
router.post("/login",userLoginAuthn);


// export
module.exports = router;