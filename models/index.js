const sequelize = require('../connection/connection');
const Users = require('./Users');
const Contacts = require('./Contacts');
const Messages = require('./Messages');

Users.hasMany(Contacts,{
    foreignKey:'userID',
    sourceKey:'id'
});

Contacts.belongsTo(Users,{
    foreignKey:'contactID',
    targetKey:'id',
    as:'contact'
});

Messages.belongsTo(Users,{
    foreignKey:'to',
    targetKey:'id',
    as:'receiver',
})

Messages.belongsTo(Users,{
    foreignKey:'from',
    targetKey:'id',
    as:'sender'
})

sequelize.sync({ alter: true })
module.exports = { Users , Messages , Contacts};