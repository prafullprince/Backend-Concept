const express = require("express");
const router = express.Router();

// import controllers
const {userSignUpAuthn} = require("../controllers/AuthN");
// making routes
router.post("/signup",userSignUpAuthn);
// export
module.exports = router;