const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./database");
const { Message } = require("./models");
const { register, login } = require("./auth");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

connectDB();

app.post("/register", register);
app.post("/login", login);

io.on("connection", (socket) => {
    console.log(`🔵 Usuário conectado: ${socket.id}`);

    socket.on("sendMessage", async (msg) => {
        const newMessage = new Message(msg);
        await newMessage.save();
        io.emit("receiveMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log(`🔴 Usuário desconectado: ${socket.id}`);
    });
});

server.listen(process.env.PORT, () => console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`));
