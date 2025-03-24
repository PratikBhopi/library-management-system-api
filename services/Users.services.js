const User = require("../models/Users.model")

module.exports.createUser=async({firstname,lastname,email,password})=>{
    if(!firstname || !email || !password){
        throw new Error("All fields are necessary")
    }

    const user=await User.create({
        fullName:{
        firstName:firstname,
        lastName:lastname},
        email,
        password
    })
    user.save();
    return user;
}
