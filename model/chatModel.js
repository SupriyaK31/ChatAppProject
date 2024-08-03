const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const GroupChat = sequelize.define('groupchat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    chatMsg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'groupchats', // Ensure this matches your actual table name if it's different
});

GroupChat.associate = function(models) {
    GroupChat.belongsToMany(models.User, { through: 'UserChatMsgs', as: 'groupchats', foreignKey: 'chatMsgId' });
  };

module.exports = GroupChat;