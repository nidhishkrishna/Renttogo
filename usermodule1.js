const mongoose = require('mongoose');

const usermodel = new mongoose.Schema({
    
    name:String,
    price:String,

    avatar:String


   
});

exports.carts = mongoose.model("cart",usermodel,"cart");