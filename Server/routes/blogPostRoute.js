const express = require("express");
const router = express.Router();
const authUser = require("../Authentication/authUser");
const BlogPost = require("../models/schema/blogPostSchema");

// always remember to use async and await to save

// Create a post
const createPost = router.post("/post", authUser, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new BlogPost({ title, content, author: req.user.userId });
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all posts
const getAllPosts = router.get("/post", authUser, async (req, res) => {
  try {
    // console.log(req.user)
    const userPosts = await BlogPost.find({ author: req.user.userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// get post for all users
const getAllPostsForAllUsers = router.get("/all-posts", async (req, res) => {
  try {
    const allPosts = await BlogPost.find().populate("comments");

    //In Mongoose, the populate() method is used to replace specified paths in 
    // a document with document(s) from other collection(s). 
    // It allows you to reference documents in other collections and pull in the 
    // referenced data when querying.

    // In your case, when you have a field like comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
    // in your BlogPost schema, it means that the comments field is an array of ObjectIds referencing documents 
    // in the Comment collection.

    // When you use populate('comments') in a query, Mongoose will replace the 
    // ObjectIds in the comments array with the actual Comment documents from the
    //  Comment collection. This is useful when you want to retrieve related documents and have a more complete view of the data.

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delet post
const deletePost = router.delete(
  "/post/:postId",
  authUser,
  async (req, res) => {
    try {
      const postId = req.params.postId;
      // find the post to delete
      const postToBeDeleted = await BlogPost.findOne({
        _id: postId,
        author: req.user.userId,
      });

      if (!postToBeDeleted) {
        res.status(400).json({
          message: "Post not found or you don't have permission to delete it",
        });
      }

      await BlogPost.deleteOne({ _id: postId });

      res.status(200).json({ message: "Post Deleted" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
);

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  getAllPostsForAllUsers,
};
