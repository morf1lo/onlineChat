const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("path");
const router = require("./routes");
const socketSetup = require("./socket");

const PORT = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(join(__dirname, "../client")));
app.use(router);

socketSetup(io);

server.listen(PORT, () => console.log(`Server online on http://localhost:${PORT}`));
