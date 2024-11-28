const express = require('express');
const app = express(); 
const cookieParser = require("cookie-parser")
const cors = require('cors');
require("dotenv").config()

// routes endpoit
const userRouter = require("../Backend/routes/userRouter");
const captainRouter = require("../Backend/routes/captainRouter")
// middelwares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())


// connect to the db 
const db = require("../Backend/config/database");
db.connectToDb()

// routes 
app.use("/api/v1", userRouter)
app.use("/captains", captainRouter)




app.get("/", (req,res)=>{
    res.send("Hello World");
})

module.exports = app;