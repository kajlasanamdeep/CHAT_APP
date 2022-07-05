const { DataTypes } = require('sequelize');
const sequelize = require('../connection/connection');

const Contacts = sequelize.define('contacts', {
    contactID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Contacts;