const express = require("express");

const app = express();

app.use((req,res,next)=>{
    console.log("middleware 1");
    next();
})

app.use((req,res,next)=>{
    console.log("middleware 2");
    next();
})

app.get("/" , (req,res)=>{
    res.send("hello world");
})
app.get("/about" , (req,res)=>{
    res.send("about page");
})

app.get("/contact" , (req,res)=>{
    res.next(new Error("something went wrong"));
})

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send("internal server error");
})
app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
})