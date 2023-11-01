const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const { join } = require('path');
const routes = require('./routes');
const socketSetup = require('./socket');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = socketIo(server);
const { json, urlencoded } = express;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../public')));

routes(app);
socketSetup(io);

server.listen(process.env.PORT, () => {
    console.log(`Server online on http://localhost:${process.env.PORT}`);
});
