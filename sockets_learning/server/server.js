const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-message", (message, room) => {
    if (room === "") {
      io.emit("recieve-message", message);
    } else {
      socket.to(room).emit("recieve-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`You are joined with room -> ${room}`);
  });
});
