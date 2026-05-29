const express = require('express');
const app = express() ;
const UserModel =  require('./usermodel') ;



app.get('/' , (req , res) => {
    res.send('hey') ;
}) ;

app.get('/create' , async (req , res) => {
    let userCreated = await UserModel.create(
        [
            {
                name : 'Ganesh' ,
                username : 'ganesh_0304' ,
                email : 'kganesh@gmail.com'
            } ,
            {
                name : 'Sanjeevani' ,
                username : 'sanjeevani_2710' ,
                email : 'sanjeevanianuse@gmail.com'
            } ,
            {
                name : 'Harsh' ,
                username : 'singh_04' ,
                email : 'harsh@gmail.com'
            } ,
            {
                name : 'Harshita' ,
                username : 'singh_4' ,
                email : 'harshita@gmail.com'
            } 
        ]
    );
    res.send(userCreated) ;
}) ;

app.get('/read' , async (req , res) => {
    // let users = await UserModel.find() ;
    let users = await UserModel.findOne({name : 'Sanjeevani Anuse'}) ;
    res.send(users) ;
})

app.get('/update' , async (req , res) => {
    let userUpdated = await UserModel.findOneAndUpdate(
        {name : 'Sanjeevani'} ,
        {name : 'Sanjeevani Anuse'} ,
        {new : true}
    );
    res.send(userUpdated) ;
});

app.get('/delete' , async (req , res) => {
    let userDeleted = await UserModel.findOneAndDelete({name : 'Harshita'}) ;
    res.send(userDeleted) ;
}) ;

app.listen(3000) ;