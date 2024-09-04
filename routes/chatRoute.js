const express=require('express');
const routes=express.Router();
const chatController=require('../controller/chatController');
const userAuth=require('../middleware/auth');

routes.post('/chat',userAuth.authonticate,chatController.addChatmessage);
routes.get('/chat',userAuth.authonticate,chatController.showChatMsg);

module.exports=routes;