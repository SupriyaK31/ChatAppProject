const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Messages = sequelize.define('Messages', {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
//  {
//     tableName: 'groups', 
// }
);


module.exports = Messages;