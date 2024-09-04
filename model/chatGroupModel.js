const Sequalize=require('sequelize');
const sequalize=require('../utils/database');

const Group=sequalize.define("Groups",{
    group_id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    group_name:{
        type:Sequalize.STRING
    },
    created_by:{
        type:Sequalize.INTEGER
    }
});

module.exports=Group;