const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    cat:String,
    deposit:String,
    pno:Number,
    min:String,
    name:String,
    rat:Number,
    avatar:String,
    cloudinary_id:String,
    desc:String



   
});

exports.images = mongoose.model("images",usermodel,"images"); 