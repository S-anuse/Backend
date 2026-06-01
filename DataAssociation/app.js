const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/' , (req , res) => {
    res.send('Hello World');
}) ;
app.get('/create' , async (req , res) => {
    const user = await userModel.create({
        name : 'John Doe',
        email : 'john.doe@example.com',
        age : 30
    });
    res.send(user);
});

app.get('/post/create' , async (req , res) => {
    const post = await postModel.create({
        postData: 'This is a post' ,
        user: "6a1d2821b656446740478425" ,
    });
    const user = await userModel.findOne({ _id : "6a1d2821b656446740478425" } ) ;
    user.posts.push(post._id) ;
    await user.save() ;
    res.send({user , post}) ;
});
app.listen(3000) ;