const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const ai = require('./ai.js')

const PORT = process.env.PORT || 1337;

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    // socket.on("question", (data) => {
	// 	result = ai.callingBot(data);
    //     socket.emit("answer", result);
    // });

	socket.on("question", (data) => {
		result = ai.callingBot(data);
        socket.emit("answer", result);

		socket.timeout(30000).emit("event", (err) => {
			socket.emit("answer", "Hey, you havent responded in a while. Are you still there?");
		});
    });

	

	//socket.emit("answer", "Welcome to our restaurant, This is Gustoso, your personal assistant. You can ask me general questions or you can start ordering straight away!");
});

app.use(express.static('frontend-react/build'));