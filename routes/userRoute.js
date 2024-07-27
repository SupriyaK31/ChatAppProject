const express=require('express');
const routes=express.Router();
const userController=require('../controller/userController');

routes.get('/',userController.getIndex);
routes.get('/Signup',userController.SignupPage);
routes.post('/Signup',userController.createUser);

module.exports=routes;