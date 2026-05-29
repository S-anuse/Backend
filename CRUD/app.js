const express = require('express') ;
const app = express() ;
const path = require('path') ;
const userModule = require('./models/user') ;

app.use(express.json()) ;
app.use(express.urlencoded({extended : true})) ;
app.use(express.static(path.join(__dirname , 'public'))) ;
app.set('view engine' , 'ejs') ;

app.get('/' , (req ,res) => {
    res.render('index') ;
}) ;
app.get('/read' , async (req,res)=>{
    let allusers = await userModule.find() ;
    res.render('read' , {allusers : allusers}) ;
});
app.post('/create' , async (req,res)=>{
    const {name , email , image} = req.body ;
    const createdUser = await(userModule.create({
        name : name ,
        email : email ,
        image : image
    }))
    res.redirect('/read') ;
})
app.get('/delete/:id' , async (req , res) => {
    await userModule.findOneAndDelete({_id : req.params.id} ) ;
    res.redirect('/read') ;
})
app.get('/edit/:id' , async (req , res) =>{
    let user = await userModule.findOne({_id : req.params.id}) ;
    res.render('edit' , {user : user}) ;
})
app.post('/update/:id' , async (req , res) => {
    const {previous_name , previous_email , image} = req.body ;
    await userModule.findOneAndUpdate({_id : req.params.id} , {
        name : previous_name ,
        email : previous_email ,
        image : image
    })
    res.redirect('/read') ;
})

app.listen(3000) ;