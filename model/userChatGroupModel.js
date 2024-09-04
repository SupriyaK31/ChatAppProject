const User = require('./userModel');
const ChatGroup = require('./chatGroupModel');
const sequelize = require('../utils/database');
const { Sequelize, DataTypes } = require('sequelize');

const group_members  = sequelize.define('group_members', {
    group_member_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    role:{
        type:DataTypes.STRING,
    },
    invited_by:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = group_members;