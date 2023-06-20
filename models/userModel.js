const mongoose = require("mongoose");
const bcrypt= require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , "Please enter a valid email"
        ]   //search for regex for email JavaScript
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLenght: [8, "password must be up to 8 characters"],
       // maxLenght: [20, "password must not be more than 20 characters"]
    },
    bio: {
        type: String,
        maxLenght: [250, "should not be more than 250 characters"],
        default: "bio"
    },
    phone: {
        type: String,
        default: "+237"
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "image\IMG1.jpg"
    }
},{
    timestamps: true,
})

//encrypt password before saving to the DB
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
return next();
    }
    //hash the password
   const salt = await  bcrypt.genSalt(10);
   const hash = await bcrypt.hashSync(this.password, salt);
   this.password=hash;
    next();
})
const User = mongoose.model("User", userSchema)
module.exports = User