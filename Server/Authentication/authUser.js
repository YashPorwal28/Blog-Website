const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const authUser = (req,res,next)=>{
    // get token from the header to accumulate useful information
    const token = req.header('Authorization')
    // if token not found
    if(!token){
        res.status(401).json({error: "Unauthorized or missing token"});
    }

    // verify token and get usefull information about user
    try{

        const decodedToken = jwt.verify(token , jwtSecret);
        req.user = decodedToken;
        next();

    }catch(error){
        console.log("Error verifying token");
        res.status(401).json({error : "Unauthorized or missing token"});
    }



}

module.exports = authUser