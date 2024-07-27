const express=require('express');
const path=require('path');
const user=require('../model/userModel');
const bcrypt=require('bcrypt');

const getIndex=(req,res)=>{
res.setHeader('Content-Type', 'text/html');
res.sendFile(path.join(__dirname,'../','views','index.html'))
};

const SignupPage = (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,'../','views','Signup.html'));
};

const createUser= async(req,res)=>{
   const {name,email,mobile,password}=req.body;
   const saltround=10;
   bcrypt.hash(password,saltround,async(err,hash)=>{
    console.log(err);
    await user.create({name,email,mobile,password:hash}).then(()=>{
        return res.status(200).json({Message:"successfull user created"});
    }).then((result)=>{
        console.log(result);
    })
   })

 };

 module.exports={
    createUser,
    SignupPage,
    getIndex
 };