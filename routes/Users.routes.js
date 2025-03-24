const express=require('express');
const router=express.Router();
const {body}= require('express-validator');
const userControllers=require('../controllers/Users.controllers');
// const authMiddleware=require('../middlewares/auth.middlewares')

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:2}).withMessage('First Name must have 2 characters'),
    body('password').isLength({min:6}).withMessage('Password must be of 6 Characters')
],userControllers.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('Password must be of 6 Characters')
],userControllers.loginUser)



module.exports=router;