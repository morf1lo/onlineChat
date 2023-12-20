import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';
import router from './routes';
import socketSetup from './socket';

const PORT: number = 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../client')));
app.use(router);

socketSetup(io);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
