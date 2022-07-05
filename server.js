const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyparser = require('body-parser');
const router = require('./routes/index');
const sockets = require('./socket.io/socket.io');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/', router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
io.on('connection',sockets);

server.listen(3000, () => {
  console.log('Server listening at port 3000');
});