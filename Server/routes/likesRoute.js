const express = require('express')
const router = express.Router();
const authUser = require("../Authentication/authUser");
const BlogPost = require("../models/schema/blogPostSchema");


// adding likes
const addLike = router.post('/post/:postId/like', authUser , async (req,res)=>{

    try{
        const postId = req.params.postId;
        const userId = req.user.userId;
        
      // check if blogpost exists
        const blogPost = await  BlogPost.findById(postId).populate('comments');
        if(!blogPost){
            return res.status(404).json({ error: 'Blog post not found' });
        }

        blogPost.likes = blogPost.likes || [];

        // check if the user has already liked the post
        if(blogPost.likes.includes(userId)){
            return res.status(400).json({ error: 'User has already liked this post' });
        }

        blogPost.likes.push(userId);
        const updatedBlogpost = await blogPost.save();
        res.status(200).json(updatedBlogpost);


    }catch(error){
        res.status(400).json({message :error.message});
    }

})

// removing like from the post

const removeLike = router.delete('/post/:postId/like', authUser , async(req,res)=>{

    try{

        const userId = req.user.userId;
        const postId = req.params.postId;

        // check if the post already exists
        const blogPost = await BlogPost.findById(postId).populate('comments');
        
        if(!blogPost){
          return  res.status(404).json({error : "Blog post not found"})
        }


        blogPost.likes = blogPost.likes || [];

        // check if the user has already liked the post

        if(!blogPost.likes.includes(userId)){
            return res.status(404).json({error : "User has not liked the post yet"})
        }

        // remove the user id from the likes array

        blogPost.likes = blogPost.likes.filter((id)=> id.toString() !== userId.toString());
        await blogPost.save();
        res.status(200).json({message : "successfully deltede like" ,blogPost});

    }catch(error){
        res.status(400).json({message : error.message});
    }


})




module.exports = {addLike,removeLike}

