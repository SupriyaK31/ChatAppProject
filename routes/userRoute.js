const express=require('express');
const routes=express.Router();
const userController=require('../controller/userController');
const userAuth=require('../middleware/auth');

routes.get('/',userController.getIndex);
routes.get('/Signup',userController.SignupPage);
routes.get('/login',userController.LoginPage);
routes.post('/Signup',userController.createUser);
routes.post('/login',userController.postLogin);
routes.get('/home',userController.HomePage);
routes.get('/users/:group_id',userAuth.authonticate,userController.userList);
// routes.get('/users/:group_id/members',userAuth.authonticate.userController.memberList1);
module.exports=routes;