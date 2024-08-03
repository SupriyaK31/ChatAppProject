const Sequalize=require('sequelize');
const sequalize=require('../utils/database');

const groupChatMember=sequalize.define("groupMember",{
    groupId:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userId:{
        type:Sequalize.INTEGER
    }
});

module.exports=groupChatMember;