const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    cat:String,
    loc:String,
    wage:String,
    desc:String,
    avatar:String,
    cloudinary_id:String,
});

exports.images1 = mongoose.model("images1",usermodel,"images1"); 