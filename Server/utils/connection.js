
const mongoose = require('mongoose');

async function connectToDatabase(){


    const url = "mongodb+srv://aristotle:Diablo786@cluster0.2joiayp.mongodb.net/?retryWrites=true&w=majority"

    try{
        await mongoose.connect(url);
        console.log("Connection to database successfull");
    }
    catch(error){
        console.log("Error connecting to database",error);
    }

}







module.exports = {connectToDatabase}