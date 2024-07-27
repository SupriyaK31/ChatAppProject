const Sequalize=require('sequelize');

const sequalize=new Sequalize('chatappdb','root','pass',{
    dialect:'mysql',
    host:'localhost',
});

module.exports=sequalize;