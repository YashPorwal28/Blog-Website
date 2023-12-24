const express = require('express');
const BlogPost = require('../models/schema/blogPostSchema');
const Comment = require('../models/schema/commentSchema'); // Adjust the path as needed

const authUser = require('../Authentication/authUser');
const router = express.Router();

const addComment = router.post('/post/:postId', authUser, async (req, res) => {
    try {
        const postId = req.params.postId;
        const text = req.body.text;
        const commentUserId = req.user.userId;

        const post = await BlogPost.findById(postId).populate("comments"); // Use populate to retrieve comments

        console.log(post.populate('comments'))
  

        // Create a new comment
        const newComment = new Comment({
            text: text,
            user: commentUserId,
        });

        // Add the new comment to the comments array
        post.comments.push(newComment);

        // Save the updated post
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);

   
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = { addComment };
