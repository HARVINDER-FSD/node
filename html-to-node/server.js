


const express = require("express");
const userRoute = require("./user.route.js");

const app = express();

app.use("/user",userRoute)


app.listen(3000,()=>{
    console.log("server running")
})



