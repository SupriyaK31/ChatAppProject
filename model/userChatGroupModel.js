const User = require('./userModel');
const ChatGroup = require('./chatGroupModel');
const sequelize = require('../utils/database');

const UserChatGroup = sequelize.define('UserChatGroup', {});



module.exports = UserChatGroup;