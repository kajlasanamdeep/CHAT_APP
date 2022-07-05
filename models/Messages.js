const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Messages = sequelize.define('messages', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
    }
}, {
    timestamps: false
});

module.exports = Messages;