const express = require('express')
const app = express();

const cors = require('cors')

const httpServer = require('http').createServer(app)
const { Server } = require('socket.io')

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});




app.use(cors());

PORT = process.env.PORT | 5000

/* app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
}) */

app.get("/", (req, res) => {
    res.status(200).json({ result: "Learning Scoket IO" })
})


io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        console.log(`Joined Room: ${data} + Name of the user: ${socket.id}`)
        socket.join(data)
    })

    socket.on("sent_message", (data) => {
        console.log("Sent Message", data)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    })
})


httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));