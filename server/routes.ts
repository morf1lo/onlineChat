import { Router, Request, Response } from 'express';
import { join } from 'path';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../client/login.html'));
});

router.post('/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const roomId = req.body.roomid;

    if (username.trim() === '' || roomId.trim() === '') {
        res.redirect('/');
    } else {
        res.redirect(`/chat?room_id=${roomId}&username=${username}`);
    }
});

router.get('/chat', (req: Request, res: Response) => {
    const roomId = req.query.room_id;
    const username = req.query.username;

    if (!username || !roomId) {
        res.redirect('/')
    } else {
        res.sendFile(join(__dirname, '../client/chat.html'));
    }
});

export default router;
