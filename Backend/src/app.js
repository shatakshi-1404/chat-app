const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const allowedOrigins = [
  "https://chat-app-6op3.vercel.app",
  "https://chat-app-6op3-git-main-shatakshis-projects-9a761aaf.vercel.app",
  "https://chat-app-6op3-8z0dcmigo-shatakshis-projects-9a761aaf.vercel.app",
];

const app = express();

// Connect to MongoDB
connectDB();
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Socket.io CORS

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));


// Routes
const authRoutes = require("./routes/authRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// Error middleware
const errorMiddleware = require("./middleware/errorMiddleware.js");
app.use(errorMiddleware);

module.exports = app;
