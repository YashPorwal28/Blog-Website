const express = require('express')
const router = express.Router();
const authUser = require('../Authentication/authUser')
const BlogPost = require('../models/schema/blogPostSchema')

// always remember to use async and await to save 


// Create a post
const createPost = router.post('/post',authUser, async (req,res)=>{
    try{
    const {title, content} = req.body
        

     const newPost = new BlogPost({title, content, author: req.user.userId })
    const savedPost  = await  newPost.save();

    res.status(200).json(savedPost)
    }catch(error){
        res.status(400).json({message: error.message})
    }

})

// get all posts
const getAllPosts = router.get('/post', authUser , async(req,res)=>{
    try{

        const userPosts = await BlogPost.find({author: req.user.userId})
        res.status(200).json(userPosts);


    }catch(error){
        res.status(401).json({message : error.message})
    }
})

// delet post
const deletePost = router.delete('/post/:postId', authUser, async (req,res)=>{
    try{

        const postId = req.params.postId;
        // find the post to delete
        const postToBeDeleted = await BlogPost.findOne({_id: postId , author:req.user.userId})

        if(!postToBeDeleted){
            res.status(400).json({message : "Post not found or you don't have permission to delete it"})
        }

        await BlogPost.deleteOne({_id: postId})

        res.status(200).json({message : "Post Deleted"})

    }catch(error){
        res.status(400).json(error.message);
    }
})




module.exports={createPost,getAllPosts,deletePost}