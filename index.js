const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this if your React app is running on a different port
    methods: ["GET", "POST"],
  },
});

const port = 3001;

io.on("connection", (socket) => {
  console.log(`New client connected with id: ${socket.id}`);

  socket.on("messageSent", (message) => {
    console.log(message);
    socket.emit("messageReceived", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
