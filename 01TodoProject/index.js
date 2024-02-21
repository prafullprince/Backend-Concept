// create server
const express = require("express");
const app = express();

// find and make port
require("dotenv").config();
const PORT = process.env.PORT || 4000 ;

// add middleware
app.use(express.json());

// import routes and mount
const allRoutes = require("./Routes/allRoutes");
app.use("/api/v1",allRoutes);

// connect database
const dbConnect = require("./Config/database");
dbConnect();

// start your server
app.listen(PORT,()=>{`started at PORT ${PORT}`});

