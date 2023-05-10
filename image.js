const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    name:String,
    // email:String,
    // mno:String,
    // loc:String,
    // aadhar:String,
    // pass:String,
    image:{
        data:Buffer,
        contentType:String

    }


   
});

exports.images = mongoose.model("login",usermodel,"login");