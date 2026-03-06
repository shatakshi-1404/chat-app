const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// ✅ CORS configuration (only once!)
app.use(
  cors({
    origin: "https://chat-app-9efx.vercel.app", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
