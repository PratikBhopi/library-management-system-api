const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware=async (req,res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
        const admin=jwt.verify(token,process.env.JWT_SECRET_KEY);
        next();
    }catch(error){
        return res.status(400).json({success:false,message:'UnAuthorized'})
    }
}