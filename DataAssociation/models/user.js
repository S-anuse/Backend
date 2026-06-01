const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dataassociation') ;

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
    },
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ] ,
    // post array will contain the id of the post which is created by the user
    age : Number
});

module.exports = mongoose.model('User', userSchema);