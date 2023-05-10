const express=require('express');
const app=express();
const{users}=require('./usermodule');
const{carts}=require('./usermodule1');
const {images}=require("./um")
const {images1}=require("./um1")
const fast2sms=require('fast-two-sms')
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const bycrypt=require('bcryptjs');
const bp=require('body-parser');
const multer=require('multer');
app.use(express.json())
const cors=require('cors');
app.use(bp.urlencoded({extended:false}))
app.use(cors())
app.set('view engine','ejs')
mongoose.connect("mongodb+srv://Naren:naarreen@cluster0.xx9d4.mongodb.net/rentogo")
const Store=multer.diskStorage({

        destination:'uploads',
        filename:( req,file,cb)=>{
    
            cb(null,file.originalname);
     
        },
    });
    const upload=multer({
        storage:Store
    }).single('testImage');
app.get('/index',async(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get('/renty',async(req,res)=>{
    res.sendFile(__dirname+"/renty.html")
})
app.get('/policy',async(req,res)=>{
    res.sendFile(__dirname+"/policy.html")
})
app.get('/pserv',async(req,res)=>{
    res.sendFile(__dirname+"/postserv.html")
})
app.get('/cart',async(req,res)=>{
    res.sendFile(__dirname+"/cart.html")
})
app.get('/serv',async(req,res)=>{
    res.sendFile(__dirname+"/service.html")
})
app.get('/login',async(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.get('/leaselaptop',async(req,res)=>{
    res.sendFile(__dirname+"/leaselaptop.html")
})
app.get('/rent',async(req,res)=>{
    res.sendFile(__dirname+"/rent.html")
})
app.get('/lease',async(req,res)=>{

    res.sendFile(__dirname+"/lease.html")
})
    // app.post('',(req,res)=>{
    //     upload(req,res,(err)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             const newlease=new user({
    //                cat:String(req.body.cat),
    //                loc:String(req.body.loc),
    //                deposit:String(req.body.deposit),
    //                min:String(req.body.min),
    //                max:String(req.body.max),
    //                 image:{
    //                     data:req.body.filename,
    //                     contentType:'image/png'
    //                 }}
                    
    //             )
    //             newlease.save((err,data)=>{
    //                 if(err){
    //                     console.log(err)
                    
    //                 }
                    
    //                 else{
    //                     res.redirect("/lease")
    //                 }
    //             })
                
    //         }})
            
    //     });    
app.post("",async(req,res)=>{
    console.log("hi");
    var user=new users();
    // console.log(String(req.body.name));
    user.name=String(req.body.name);
    user.email=String(req.body.email);
    user.mno=Number(req.body.mno);
    user.loc=String(req.body.loc);
    user.pass=String(req.body.pass);
    user.aadhar=String(req.body.aadhar);
    // bycrypt.hash(req.body.pass, 10,function(err, hashedpass){
    //     if(err){
    //         res.json({
    //             error:err
    //         })
    //     }
    //     user.pass=hashedpass;
    // })
   
    
    //console.log(user.pass);
    user.save((err,data)=>{
        if(err){
            console.log(err)
        
        }
        
        else{
            res.redirect("/login")
        }
    })
})

app.get('/public/:file',(req,res)=>{
    
    
    res.sendFile(__dirname+'/public/'+req.params.file)
})
app.get('/:file',(req,res)=>{
    
    
    res.sendFile(__dirname+'/'+req.params.file)
})
app.post("/login1",async(req,res)=>{
    var name=req.body.name;
    var pass=req.body.pass;
    console.log(pass);
    
    users.findOne({$or:[{name:name}]})
    .then(users=>{
        if(users){
            if(pass==users.pass){
                res.redirect("/index")
            }
            else{
                console.log("pass")
                res.redirect("/login")
            }
            
        }
    
    else{
            console.log("user");
            res.redirect("/login")
        
    }

    })
});
app.post("/leaselap",async(req,res)=>{
    var name=req.body.name;
    var brand=req.body.brand;
    var rom=req.body.rom;
    var ram=req.body.ram;
    var gpu=req.body.gpu;
    var yob=req.body.yob;
    console.log("hi");
    
    let image=await images.findOneAndUpdate({ "name" : name },{ $set: { "brand" :brand, "rom" : rom,"ram":ram,"gpu":gpu,"yob":yob} });
    console.log(image);
    res.redirect("/index");

  
});
app.post("/add1",async(req,res)=>{
    var name=req.body.bt1;
    var rat=Number(req.body.age);
    console.log(name);
    let image = await images.find({"pno":name});
    let r1=image[0].rat;
    let r2;
    if(r1==0){
        r2=rat;
    }
    else{
    r2=(rat+r1)/2;
    }
    console.log(r2);
   const val=await images.findOneAndUpdate({"pno":name},{ $set:{"rat":r2}});
    res.redirect("/renty");
});
app.post("/add",async(req,res)=>{
    var name=req.body.bt;
    console.log(name);
    let image = await images.find({"pno":name});
    
    try {
        console.log("hi");
        let image = await images.find({"pno":name});
        let p=req.body.pno;
        let cart=new carts();

        console.log(image);
        await fast2sms.sendMessage({
            authorization: process.env.API_KEY,
            message: "Hi your product has been rented",
            numbers: [image[0].pno]
          })
          await fast2sms.sendMessage({
            authorization: process.env.API_KEY,
            message: "Hi from team rentogo the renter's phone number:"+name,
            numbers: [p]
          })
        

          cart.save((err,data)=>{
            res.redirect("/index");

             
            if(err){
                console.log(err)
            
            }
            
            
    })
//images.remove(image);
      
      } catch (err) {
        console.log(err);
      }


    

  
});
// app.post("/serv",async(req,res)=>{
//     var name=req.body.name;
//     var brand=req.body.brand;
//     var rom=req.body.rom;
//     var ram=req.body.ram;
//     var gpu=req.body.gpu;
//     var yob=req.body.yob;
//     console.log("hi");
    
//     let image=await images.findOneAndUpdate({ "name" : name },{ $set: { "brand" :brand, "rom" : rom,"ram":ram,"gpu":gpu,"yob":yob} });
//     console.log(image);
//     res.redirect("/index");

  
// });
app.use('/serv',  require('./routes/user1'))
app.post("/re1", async (req, res) => {
    console.log("hi");
    //const name=req.body.name;
    //let image = await images1.find({name:name});
    try {
      let image = await images1.find({});
      res.json(image);
      //console.log(image[0].avatar);
    
    } catch (err) {
      console.log(err);
    }

  });

app.use('/lease1',  require('./routes/user'))
app.post("/re", async (req, res) => {
    console.log("hi");
    try {
      let image = await images.find({});
      res.json(image);
      //console.log(image[0].avatar);
    
    } catch (err) {
      console.log(err);
    }

  });

  app.post("/cartre", async (req, res) => {
    console.log("hi");
    try {
      let image = await carts.find({});
      res.json(image);
      //console.log(image[0].avatar);
    
    } catch (err) {
      console.log(err);
    }

  });
app.listen(5000,function(){
    console.log("ok");
})    

