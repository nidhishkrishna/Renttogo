const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    name:String,
    email:String,
    mno:String,
    loc:String,
    aadhar:String,
    pass:String,
    


   
});

exports.users = mongoose.model("login",usermodel,"login");