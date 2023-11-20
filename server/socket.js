module.exports = function (io) {
    io.on('connection', socket => {
        socket.on('join-room', room => {
            socket.join(room);
            socket.on('greeting-message', data => {
                io.to(room).emit('greeting-message', {
                    message: data.message,
                    system: data.author
                });
            });
            socket.on('chat-message', data => {
                io.to(room).emit('chat-message', {
                    message: data.message,
                    author: data.name
                });
            });
        });
    });
}
