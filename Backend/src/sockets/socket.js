const { Server } = require("socket.io");



const initSocket = (server) => {

const io = new Server(server, {
   cors: {
      origin: ["https://chat-app-9efx.vercel.app/"],
      methods: ["GET", "POST"],
      credentials: true

    }
  });

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("sendMessage", (data) => {

      io.emit("receiveMessage", data);

    });

    socket.on("disconnect", () => {

      console.log("User disconnected:", socket.id);

    });

  });

};

const getIO = () => {

  if (!io) {
    throw new Error("Socket.io not initialized!");
  }

  return io;

};

module.exports = {
  initSocket,
  getIO
};
