const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const User = require('../models/schema/userSchema')



const signup = router.post('/signup', async(req,res)=>{
    try{
        const {username, email, password} = req.body;
    

        const newUser = new User({
            username,email,passwordHash:password
        })

        // res.json(newUser);

        const savedUser = await newUser.save();

        res.status(200).json(savedUser);
    }catch(error){
        console.log("error creating user");
        res.status(500).json({message: error.message})
    }
})

const signin = router.post('/signin', async(req,res)=>{

    try{
        const{username, password} = req.body;

        // check whether the user is existing in database or not
        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(401).json({error : "Invalid credentials"})
        }

        // if existing user then match the password
        const passwordMatch = await bcrypt.compare(password,existingUser.passwordHash);
        if(!passwordMatch){
            res.status(401).json({error: "Invalid Credentials"});
        }


        // if auth is successful generate a jwt token

        const token = jwt.sign({
            userId : existingUser.id , username: existingUser.username
        },jwtSecret,{expiresIn:'1h'})



        res.status(200).json({user :existingUser ,message: "Signin successfull", token})

    }catch(error){

        res.status(401).json({"error": error.message});
    }


})



module.exports= {signup,signin}