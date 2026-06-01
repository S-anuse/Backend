const express = require('express') ;
const app = express() ;

const path = require('path') ;
const cookieParser = require('cookie-parser') ;
const userModel = require('./models/user') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

app.set('view engine' , 'ejs') ;
app.use(express.json()) ;
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser()) ;
app.use(express.static(path.join(__dirname , 'public'))) ;

app.get('/' , (req , res) => {
    res.render('index') ;
}) ;
app.post('/create' , (req , res) => {
    const {username , password , email , age} = req.body ;
    // encrpy the password using bcrypt
    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt , async (err , hash) => {
            const user = await userModel.create({username , password:hash , email , age}) ;
            res.send(user) ;
        })
    })
    let token = jwt.sign({email} , "shhhhhhh") ;
    res.cookie('token' , token) ;
    console.log(token) ;
    
})
app.get('/logout' , (req , res) => {
    res.cookie('token' , '') ;
    res.redirect('/') ;
}) ;
app.get('/login' , (req , res) => {
    res.render('login') ;
}) ;
app.post('/login' , (req , res) => {
    let loginUser = userModel.findOne({email : req.body.email}) ;
    if(!loginUser) return res.send('Something went wrong') ;
    bcrypt.compare(req.body.password , loginUser.password , (err , result) => {
        if(result){
            let token = jwt.verify({email} , "shhhhhhh") ;
            res.cookie('token' , token) ;
            res.redirect('/') ;
        }
        else res.send('Something went wrong') ;
    })  
})
app.listen(3000) ;