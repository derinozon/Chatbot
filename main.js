const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

server.listen(5000, function () {
  console.log("server started at port 5000");
});

io.on("connection", (socket) => {
  console.log(`A user is connected with ID: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected ID: ${socket.id} due to ${reason}`);
  });

  socket.on("dish", (data) => {
    result = "I didnt quite understand that";

    if (data.includes("cheese"))
      result = "You should try our delicious Quattro Formaggi!";

    socket.emit("answer", result);
  });
});

app.use(express.static("dummy"));
