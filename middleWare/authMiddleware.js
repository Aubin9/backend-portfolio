const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.token
        if(!token){
            res.status(401)
            throw new Error("Not authorize, please login")
        }

        //verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // get user id from Token
       const user= await User.findById(verified.id).select("-password")
        if(!user){
            res.status(401)
            throw new Error("User not found")
        }
        res.user = user
        next()
    } catch (error) {
        
    }
});

module.exports = protect