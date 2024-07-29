const express=require('express');
const routes=express.Router();
const userController=require('../controller/userController');

routes.get('/',userController.getIndex);
routes.get('/Signup',userController.SignupPage);
routes.get('/login',userController.LoginPage);
routes.post('/Signup',userController.createUser);
routes.post('/login',userController.postLogin);
routes.get('/home',userController.HomePage);

module.exports=routes;