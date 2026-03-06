require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-9efx.vercel.app", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: receive and broadcast chat messages
  socket.on("send-message", (data) => {
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
