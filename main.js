const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const ai = require("./ai.js");

const PORT = process.env.PORT || 1337;

server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });

  socket.on("question", (data) => {
    result = ai.callingBot(data);
    if (result !== -1) {
      socket.emit("answer", result);
	  // Not working //
	//   socket.timeout(15000).emit("event", () => {
	//     socket.emit(
	//       "answer",
	//       "Hey, you havent responded in a while. Are you still there?"
	//     );
	//   });
    }
  });

  

  ai.init();
});

app.use(express.static("frontend-react/build"));
