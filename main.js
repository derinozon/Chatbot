const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 1337;

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("dish", (data) => {
		result = "I didnt quite understand that";

		if (data.includes('cheese'))
			result = "You should try our delicious Quattro Formaggi!"

        socket.emit("answer", result);
    });
});

app.use(express.static('build'));