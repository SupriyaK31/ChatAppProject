const Sequalize=require('sequelize');
const sequalize=require('../utils/database');

const User =sequalize.define('user',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequalize.STRING
    },
    email:{
        type:Sequalize.STRING,
        unique:true
    },
    mobile:{
        type:Sequalize.STRING,
        unique:true,
    },
    password:{
        type:Sequalize.STRING
    }
});

User.associate = function(models) {
    User.belongsToMany(models.ChatMsg, { through: 'UserChatMsgs', as: 'groupchats', foreignKey: 'userId' });
  };

module.exports=User;