const express=require('express');
const route=express.Router();
const groupController=require('../controller/groupContoller');
const userAuth=require('../middleware/auth');

route.post('/group',userAuth.authonticate,groupController.createGroup);
route.get('/group',userAuth.authonticate,groupController.getGrouplist);
route.post('/group/:group_id/add-members',userAuth.authonticate,groupController.memberList);

module.exports=route;