const express = require('express') ;
const app = express() ;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

app.use(cookieParser()) ;

app.get('/' , (req , res) => {
    // res.cookie('name' , 'John Doe') ;
    // res.send('Cookie has been set') ;
    // bcrypt.genSalt(10 , (err , salt) => {
    //     console.log(salt) ;
    //     bcrypt.hash("Sanju@2710" , salt , (err , hash) => {
    //         console.log(hash) ;
    //     }) ;            
    // }) ;

    // bcrypt.compare("Sanju@2810" , "$2b$10$QDfkINSgOcFfc3kLW4sUQOJOeQrDXSsD1MagVqIN5wl/XGzUQfAbS" ,(err , result) => {
    //     console.log(result) ;
    // })

    let token =jwt.sign({email : "sanjeevanianuse@gmail.com"} , "sonu") ;
    console.log(token) ;
    res.cookie('token' , token) ;
    res.send('Token cookie has been set! Now you can visit /read');

});

app.get('/read' , (req , res) => {
    // console.log(req.cookies) ;
    // res.send('Cookie has been read') ;
    // console.log(req.cookies.token) ;
    let data = jwt.verify(req.cookies.token , "sonu") ;
    console.log(data) ;
    res.send('Token has been verified! Check the console for details.');
})

app.listen(3000 ) ;