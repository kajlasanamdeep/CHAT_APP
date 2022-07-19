const {Messages, Contacts} = require('../models/index');
const users = {};
module.exports = (socket) => {
    socket.on('active_user', (user) => {
        console.log(user);
        socket.username = user.username;
        socket.userID = user.userID;
        users[user.userID] = socket.id;
    });
    socket.on('send_message',async(data) => {
        let socketID = users[data.contactID];
        socket.to(socketID).emit('message', {
            contactID: socket.userID,
            contactName: socket.username,
            message: data.message
        });
        await Contacts.findOrCreate({
            where:{
                userID: data.contactID,
                contactID: socket.userID
            }
        })
        await Messages.create({
            message: data.message,
            to: data.contactID,
            from: socket.userID
        });
    });
}