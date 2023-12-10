require('dotenv').config();
const express = require('express');
const app = express()
const {signup,signin} = require('./routes/userRoute')
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/connection');
const { createPost , getAllPosts ,deletePost} = require('./routes/blogPostRoute');

app.use(bodyParser.json());
connectToDatabase();




app.use('/api',signup);
app.use('/api',signin);
app.use('/api',createPost);
app.use('/api',getAllPosts);
app.use('/api',deletePost);

app.listen(5000, ()=>{
    console.log("Listening on port 5000");
})