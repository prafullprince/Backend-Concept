const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");


// app create krna hai
const app = express();

// port find krna hai
const PORT = process.env.PORT || 3000;

// middleware use krna hai
app.use(express.json());
app.use(fileUpload());

// route find krna hai
const routes = require("./routes/Routes");

// mount krna hai
app.use("/api/v1",routes);

// db connect krna hai
const dbConnect = require("./config/database");
dbConnect();

// cloud se connect krna hai
cloudinary.cloudinaryConnect();  

// app ko listen krana hai
app.listen(PORT,()=>{console.log(`app started at port${PORT}`);});

