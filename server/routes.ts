import { Router, Request, Response } from 'express';
import { join } from 'path';

const router: Router = Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../client/login.html'));
});

router.post('/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const roomid = req.body.roomid;

    if (username.trim() === '' || roomid.trim() === '') {
        res.redirect('/');
    } else {
        res.redirect(`/chat?room_id=${roomid}&username=${username}`);
    }
});

router.get('/chat', (req: Request, res: Response) => {
    const username = req.query.username;

    if (!username) {
        res.redirect('/')
    } else {
        res.sendFile(join(__dirname, '../client/chat.html'));
    }
});

export default router;
