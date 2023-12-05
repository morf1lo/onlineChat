import { Server, Socket } from 'socket.io';

interface Data {
    message: string,
    author: string
};

export default (io: Server) => {
    io.on('connection', (socket: Socket) => {
        socket.on('join-room', (room: string) => {
            socket.join(room);
            socket.on('greeting-message', (data: Data) => {
                io.to(room).emit('greeting-message', {
                    message: data.message,
                    author: data.author
                });
            });
            socket.on('chat-message', (data: Data) => {
                io.to(room).emit('chat-message', {
                    message: data.message,
                    author: data.author
                });
            });
        });
    });
};
