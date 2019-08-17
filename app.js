    //jshint esversion:6
    //require
    require('dotenv').config();
    const express = require("express");
    const bodyParse = require("body-parser");
    const ejs = require("ejs");
    const mongoose = require("mongoose");
    const encrypt = require("mongoose-encryption");
    const app = express();


    //Data Base part:
    mongoose.connect("mongodb+srv://admin-gal:gb@14789@cluster0-y3stx.mongodb.net/UserDB",{useNewUrlParser:true});

    const userSchema= new mongoose.Schema({
    Username:String,
    Password:String
    });
     
 
    userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ['Password'] });
    const User = mongoose.model("User",userSchema);
    




    //use of packegs
    app.use(express.static("public"));
    app.set("view engine" ,"ejs");
    app.use(bodyParse.urlencoded({extended:true}));


    //functions (Get)
    app.get("/",function(req,res){
    res.render("home");
    });


    app.get("/login",function(req,res){
        res.render("login");
    });


    app.get("/register",function(req,res){
        res.render("register");
    });


    //functions (Post):
    app.post("/register",function(req,res){
    const Newuser= new User({
        Username:req.body.username,
        Password:req.body.password
    });


    User.findOne({Username:Newuser.Username},function(err,users){

        if(users===null){
            console.log("not found");
            Newuser.save();
        }
        else{
            console.log(" found");
            
        }
    });
    res.render("secrets");
    });

    app.post("/login",function(req,res){
        
        const Username = req.body.username;
        const Password = req.body.password;
        User.findOne({Username:Username},function(err,founduser){
        if(err){
            console.log(err)
        }
        else{
            if(founduser){
                console.log(founduser);
                if(founduser.Password=== Password){
                    res.render("secrets");
                }

            }
        }
        });

    });









    app.listen(3000,function(req,res){
    console.log("listen on port 3000");
    });