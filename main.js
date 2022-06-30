const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

<<<<<<< foodtest
server.listen(5000, function () {
  console.log("server started at port 5000");
=======
const PORT = process.env.PORT || 1337;

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
>>>>>>> main
});

io.on("connection", (socket) => {
  console.log(`A user is connected with ID: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected ID: ${socket.id} due to ${reason}`);
  });

<<<<<<< foodtest
  socket.on("dish", (data) => {
    result = "I didnt quite understand that";
=======
    socket.on("question", (data) => {
		result = "I didnt quite understand that";
>>>>>>> main

    if (data.includes("cheese"))
      result = "You should try our delicious Quattro Formaggi!";

    socket.emit("answer", result);
  });
});

<<<<<<< foodtest
app.use(express.static("dummy"));
=======
app.use(express.static('frontend-react/build'));
>>>>>>> main
