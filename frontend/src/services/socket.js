import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-vzq3.onrender.com", {
  withCredentials: true
});

export default socket;