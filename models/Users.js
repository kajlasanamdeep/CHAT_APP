const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Users = sequelize.define('users',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false
});

module.exports = Users;