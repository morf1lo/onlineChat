const { join } = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '../public/login.html'));
    });
    
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const roomid = req.body.roomid;
        if (username.trim() === '' || roomid.trim() === '') {
            res.redirect('/');
        } else {
            res.redirect(`/chat?room_id=${roomid}&username=${username}`);
        }
    });
    
    app.get('/chat', (req, res) => {
        const username = req.query.username;
        if (!username) {
            res.redirect('/')
        } else {
            res.sendFile(join(__dirname, '../public/chat.html'));
        }
    });
}
