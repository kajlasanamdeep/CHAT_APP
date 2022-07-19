const router = require('express').Router();
const { Users, Messages, Contacts } = require('../models/index');
const sequelize = require('sequelize');
const Op = sequelize.Op;

router
    .get('/', (req, res) => {
        return res.render('login', { message: "LOGIN FORM" })
    })
    .post('/login', async (req, res) => {
        try {
            let user = await Users.findOne({
                where: req.body,
                include: {
                    model: Contacts,
                    include: 'contact'
                }
            });
            user = user.toJSON();
            if (!user) return res.render('login', { message: 'USER NOT FOUND' });
            let messages = await Messages.findAll({
                where: {
                    [Op.or]: [{ to: user.id }, { from: user.id }]
                },
                separate: true,
                order: [['at', 'ASC']],
                include: ['receiver', 'sender']
            });
            console.log(user);
            return res.render('chat', { id: user.id, username: user.username, contacts: user.contacts, messages: messages });
        } catch (error) {
            throw error;
        }
    })


    .get('/signup', (req, res) => {
        return res.render('signup', { message: "SIGNUP FORM" });
    })
    .post('/signup', async (req, res) => {
        try {
            let exitingUser = await Users.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (exitingUser) return res.render('signup', { message: 'CHOOSE OTHER USERNAME' });
            let newUser = await Users.create(req.body);
            newUser = newUser.toJSON()
            return res.render('chat', newUser);
        } catch (error) {
            throw error;
        }
    })


    .post('/addContact', async (req, res) => {
        try {
            let newContact = await Users.findOne({
                where: {
                    username: req.body.contactName
                }
            });
            if (newContact) {
                let existingContact = await Contacts.findOne({
                    where: {
                        userID: req.body.userID,
                        contactID: newContact.id
                    }
                });
                if (!existingContact) {
                    newContact = newContact.toJSON()
                    await Contacts.create({
                        userID: req.body.userID,
                        contactID: newContact.id
                    });
                }
            }
            let user = await Users.findOne({
                where: {
                    id: req.body.userID
                },
                include: {
                    model: Contacts,
                    include: 'contact'
                }
            });
            user = user.toJSON()
            let messages = await Messages.findAll({
                where: {
                    [Op.or]: [{ to: user.id }, { from: user.id }]
                },
                separate: true,
                order: [['at', 'ASC']],
                include: ['receiver', 'sender']
            });

            return res.render('chat', { id: user.id, username: user.username, contacts: user.contacts, messages: messages });
        } catch (error) {
            throw error
        }
    });

module.exports = router;