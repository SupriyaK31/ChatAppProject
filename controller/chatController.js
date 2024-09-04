const express=require('express');
const path=require('path');
const User=require('../model/userModel');
const Group=require('../model/chatGroupModel');
const bcrypt=require('bcrypt');
const sequalize = require('../utils/database');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const chatMessage=require('../model/messageModel');
const { Op } = require('sequelize');
dotenv.config();

const addChatmessage=async(req,res)=>{
    try {
        const { message,group_id } = req.body;
        const user_id = req.user.user_id;
        console.log("gid-----",group_id);
        // if (!message || !userid) {
        //     return res.status(400).json({ error: "Message and userID are required" });
        // }
        const result = await chatMessage.create({ message, user_id, group_id } );
        console.log("Result:", result);
        return res.status(200).json({ Message: "Successful message saved to db", data: result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server issue" });
    }
};

const showChatMsg=async(req,res)=>{
    const lastmsgid=req.query.lastmsgid;
    const gid=req.query.group_id;
    console.log("lastmsg",lastmsgid);
    console.log("group id",gid);
try{

    const chats = await chatMessage.findAll({
         where: { group_id: gid,
            message_id:{
                [Op.gt]:lastmsgid
            }
          },
         attributes:['message_id','message','createdAt'],
        include: [{
            model: User,
            attributes:['user_id','username'],
           },
          {
            model:Group,
            attributes:['group_id','group_name'],
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