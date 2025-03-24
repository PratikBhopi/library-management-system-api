const jwt=require('jsonwebtoken');
const User = require('../models/Users.model');
require('dotenv').config();

exports.authMiddleware=async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
        const {id}=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await User.findById(id);
        if(!user) throw new Error('UnAuthorized')
        next();
    }catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}

