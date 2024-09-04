const jwt=require('jsonwebtoken');
const User=require('../model/userModel');
const dotenv=require('dotenv');

dotenv.config();
const authonticate=(req,res,next)=>{
try{
    const token = req.header('Authorization');

if (!token) {
    return res.status(401).send('Access denied. Token not provided.');
}
    console.log(token);
    const user=jwt.verify(token,process.env.token);
    console.log("UserID>>",user.user_id);
    User.findByPk(user.user_id).then(user=>{
        req.user=user;
        next();
    })
}catch(error){
    console.error(error);
}
};

module.exports={
    authonticate
}