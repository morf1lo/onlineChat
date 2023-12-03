const { Router } = require('express');
const { join } = require('path');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../client/login.html'));
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const roomid = req.body.roomid;
    if (username.trim() === '' || roomid.trim() === '') {
        res.redirect('/');
    } else {
        res.redirect(`/chat?room_id=${roomid}&username=${username}`);
    }
});

router.get('/chat', (req, res) => {
    const username = req.query.username;
    if (!username) {
        res.redirect('/')
    } else {
        res.sendFile(join(__dirname, '../client/chat.html'));
    }
});

module.exports = router;
