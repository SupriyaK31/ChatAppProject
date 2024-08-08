const Sequalize=require('sequelize');
const sequalize=require('../utils/database');

const chatGroup=sequalize.define("chatGroups",{
    Id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    gName:{
        type:Sequalize.STRING
    },
    userId:{
        type:Sequalize.INTEGER
    }
});

module.exports=chatGroup;