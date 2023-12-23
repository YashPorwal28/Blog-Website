require('dotenv').config();
const express = require('express');
const app = express()
const {signup,signin} = require('./routes/userRoute')
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/connection');
const { createPost , getAllPosts ,deletePost ,getAllPostsForAllUsers} = require('./routes/blogPostRoute');
const { addComment } = require('./routes/commentRoute');

app.use(bodyParser.json());
connectToDatabase();




app.use('/api',signup);
app.use('/api',signin);
app.use('/api',createPost);
app.use('/api',getAllPosts);
app.use('/api',getAllPostsForAllUsers);
app.use('/api',deletePost);
app.use('/api',addComment)



app.listen(5000, ()=>{
    console.log("Listening on port 5000");
})