const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('chat_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;