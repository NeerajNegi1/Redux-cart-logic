const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim:true,
        required: true,
        max:32
    },
    lname: {
        type: String,
        trim:true,
        required: true,
        max:32
    },
    email: {
        type: String,
        trim:true,
        unique:true,
        lowercase:true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        default:'user'
    },
    resetPasswordLink: {
        type:String,
        default:''
    },
    products: {
        type:Array,
        required:true
    }
},{timestamps:true})

const User = mongoose.model("User", userSchema)

module.exports = User;