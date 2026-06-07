const express = require('express') ;
const app = express() ;
const cookieParser = require('cookie-parser') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;
const userModel = require('./models/user') ;
const postModel = require('./models/post') ;
// const multer = require('multer') ;
// const crypto = require('crypto') ;
const path = require('path') ;
// const { bytes } = require('stream/consumers');
const upload = require('./config/multerconfig') ;

app.set('view engine', 'ejs') ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true })) ;
app.use(cookieParser()) ;
app.use(express.static(path.join(__dirname , "public"))) ;


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads')
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(16, (err, bytes) => {
//         console.log(bytes) ;
//         const fn = bytes.toString('hex') + path.extname(file.originalname) ;    
//         cb(null, fn) ;
//         console.log(fn) ;
//     }) ;
//   }
// })
// const upload = multer({ storage: storage }) ;

app.get('/', (req, res) => {
    res.render('index') ;
}) ;

app.post('/register' , async (req , res) => {
    let {username , name , age , email , password } = req.body ;
    // check if user already exists
    const alreadyUser = await userModel.findOne({ email }) ;
    if(alreadyUser){
        return res.status(500).send('User already exists') ;
    }
    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt , async (err , hash) => {
            const userCreated = await userModel.create({
                username ,
                name ,
                age ,
                email ,
                password: hash
            }) ;
            let token = jwt.sign({email , userid : userCreated._id} , 'shhhhhh') ;
            res.cookie('token' , token) ;
            res.send('User registered successfully') ;
        }) ;
    }) ;
    

}) ;

app.get('/login' , (req , res) => {
    res.render('login') ;
}) ;


app.post('/login' , async (req , res) => {
    let {email , password} = req.body ;
    const user = await userModel.findOne({ email }) ;
    if(!user){
        return res.status(500).send('Something went wrong') ;
    }
    bcrypt.compare(password , user.password , (err , result) => {
        if(!result) return res.status(500).send('Invalid credentials') ;
        let token = jwt.sign({email , userid : user._id} , 'shhhhhh') ;
        res.cookie('token' , token) ;
        res.status(200).redirect('/profile') ;
        console.log(token) ;
    }) ;
}) ;

app.get('/logout', (req, res) => {
    res.clearCookie('token'); 
    console.log('User logged out successfully'); 
    res.redirect('/login');
});


app.get('/profile' , isLoggedIn , async (req , res) => {
    let user = await userModel.findOne({ email : req.user.email }) ;
    let post = await postModel.find({ user : user._id }) ;
    console.log(user) ;
    res.render('profile' , {user , post}) ;
}) ;

app.post('/post' , isLoggedIn , async(req , res) => {
    let {postData} = req.body ;
    let user = await userModel.findOne({ email : req.user.email }) ;
    let post = await postModel.create({
        postData ,
        user : user._id
    });
    user.posts.push(post._id) ;
    await user.save() ;
    res.redirect('/profile') ;
})

app.get('/like/:id' , isLoggedIn , async (req , res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user') ;
    if(post.likes.includes(req.user.userid)){
        post.likes.splice(post.likes.indexOf(req.user.userid) , 1) ;
    }
    else {
        post.likes.push(req.user.userid) ;
    }
    await post.save() ; 
    res.redirect('/profile') ;
    // Handle like logic here
});

app.get('/edit/:id' , isLoggedIn , async (req , res) => {
    let post = await postModel.findOne({_id : req.params.id}) ;
    res.render('edit', {post}) ;
});

app.post('/update/:id' , isLoggedIn , async(req , res) => {
    let {postData} = req.body ;
    let post = await postModel.findOneAndUpdate({_id : req.params.id} , {postData}) ;
    res.redirect('/profile') ;
})

// app.get('/test' , (req , res) => {
//     res.render('test') ;
// }) ;



app.get('/profile/upload', isLoggedIn , (req , res) => {
    res.render('profileupload') ;
}) ;

app.post('/upload' ,isLoggedIn , upload.single('image'), async (req, res) => {
    console.log(req.file) ;
    let user = await userModel.findOne({email : req.user.email}) ;
    user.profilepic = req.file.filename ;
    await user.save() ;
    res.redirect('/profile');
}) ;

function isLoggedIn(req , res , next) {
    if(!req.cookies.token) res.redirect('/login') ;
    let data = jwt.verify(req.cookies.token , 'shhhhhh') ;
    req.user = data
    next() ;
}
app.listen(3000) ;