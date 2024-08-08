const express=require('express');
const path=require('path');
const User=require('../model/userModel');
const bcrypt=require('bcrypt');
const sequalize = require('../utils/database');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const chat=require('../model/chatModel');
const { Op } = require('sequelize');
dotenv.config();

const addChatmessage=async(req,res)=>{
    try {
        const { chatMsg } = req.body;
        const userid = req.user.id;
        const groupID = 1;
        // console.log("Message type of", typeof(chatMsg));
        // console.log('chatGroupID type of :', typeof(groupID));
        // console.log('user type of :', typeof(userid));
        if (!chatMsg || !userid) {
            return res.status(400).json({ error: "Message and userID are required" });
        }
        const result = await chat.create({ chatMsg, userid, groupID } );
        console.log("Result:", result);
        return res.status(200).json({ Message: "Successful message saved to db", data: result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server issue" });
    }
};

const showChatMsg=async(req,res)=>{
try{
    const lastmsgid=req.query.lastmsgid;
    console.log(lastmsgid)
    const chats = await chat.findAll({
         where: { groupID: 1,
            id:{
                [Op.gt]:lastmsgid
            }
          },
         attributes:['id','chatMsg'],
        include: [{
            model: User,
            attributes:['name'],
          }]
      });
        res.status(200).json({message:"chat Details", data:chats});

}catch(error){
    res.status(500).json({error:"Internal server issue"});
}
};
module.exports={
    addChatmessage,
    showChatMsg,
}