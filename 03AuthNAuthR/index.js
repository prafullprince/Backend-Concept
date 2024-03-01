const express = require("express");
require("dotenv").config();

// making ann app 
const app = express();
// making port
const PORT = process.env.PORT || 4000;
// add middlerware 
app.use(express.json());
// routes
const routes = require("./routes/Route");
// mount api
app.use("/api/v1",routes);
// dbConnect
const dbConnect = require("./config/database");
dbConnect();
// listen our app
app.listen(PORT,()=>{
    console.log(`app started successfully at PORT${PORT}`);
});