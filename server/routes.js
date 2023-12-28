const { Router } = require("express");
const { join } = require("path");

const router = Router();

router.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../client/login.html"));
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const roomid = req.body.roomid;

    if (!username || !roomid 
      || !username.trim() || !roomid.trim()) {
        return res.redirect("/");
    } else {
        return res.redirect(`/chat/${roomid}?username=${username}`);
    }
});

router.get("/chat/:id", (req, res) => {
    const username = req.query.username;
    const id = req.params.id;

    if (!username || !id) {
        res.redirect("/")
    } else {
        res.sendFile(join(__dirname, "../client/chat.html"));
    }
});

module.exports = router;
