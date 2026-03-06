const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
app.use(cors({
  origin: ["https://chat-app-9efx.vercel.app/"],
  credentials: true
}));
const app = express();

const authRoutes = require("./routes/authRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const errorMiddleware = require("./middleware/errorMiddleware.js");







connectDB();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);


app.use(errorMiddleware);

module.exports = app;
