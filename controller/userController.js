const express=require('express');
const path=require('path');
const user=require('../model/userModel');
const bcrypt=require('bcrypt');
const sequalize = require('../utils/database');
const { Sequelize, where } = require('sequelize');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();

function generateToken(id,name){
    return jwt.sign({userId:id, name:name},process.env.TOKEN);
}
const getIndex=(req,res)=>{
res.setHeader('Content-Type', 'text/html');
res.sendFile(path.join(__dirname,'../','views','index.html'))
};

const SignupPage = (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,'../','views','Signup.html'));
};

const LoginPage = (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,'../','views','login.html'));
};
const HomePage = (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,'../','views','home.html'));
};
function isstringValidator(string){
    if(string =='undefine' || string.length===0){
        return true;
    }else{
        return false;
    }
}
const createUser= async(req,res)=>{
    try{
        const {name,email,mobile,password}=req.body;
        if(isstringValidator(name) || isstringValidator(email) || isstringValidator(password)){
         return res.status(400).json({err:'bad Paramets. Something is missing'})
        }
        const saltround=10;
        bcrypt.hash(password,saltround,async(err,hash)=>{
         console.log(err);
         await user.create({name,email,mobile,password:hash}).then(()=>{
             return res.status(200).json({Message:"successfull user created"});
         }).then((result)=>{
             console.log(result);
         }).catch((err)=>{
            if (err instanceof Sequelize.UniqueConstraintError){
                return res.status(409).json({message:"User already Exist"})
            }else{
                 return res.status(500).json({error:"Something went wrong"})
            }
         })
        })
    }catch(error){
        console.log(error);
    }
   

 };

 const postLogin =async(req,res)=>{
try{
    const {email,password}=req.body;
   
    if(isstringValidator(email) || isstringValidator(password)){
        return res.status(400).json({err:'bad Parameters. Something is missing'})
    }
    const User=await user.findOne({ where : { email:email}});
    if(!User){
        return res.status(401).json({error:"User not Exist"});
    }else{
        const passMatch= await bcrypt.compare(password,User.password);
        if(passMatch){
            return res.status(200).json({message:'login Sucessful',token: generateToken(User.id,User.name)});
        }else{
            res.status(401).json({error:'Password does not matched'});
        }
    }
}  catch(error){
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});

  }
 };

 module.exports={
    createUser,
    SignupPage,
    getIndex,
    LoginPage,
    postLogin,
    HomePage,
    generateToken
 };