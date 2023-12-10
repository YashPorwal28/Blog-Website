const mongoose = require('mongoose');
const User = require('./userSchema');
const commentSchema = require('./commentSchema')

const blogPostSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content :{type:String, required:true},
    author :{type:mongoose.Schema.Types.ObjectId ,ref : 'User' , required:true},
    comments: [commentSchema],
    createdAt:{type:Date, default:Date.now}

})

const BlogPost = mongoose.model('BlogPost',blogPostSchema);

module.exports = BlogPost;