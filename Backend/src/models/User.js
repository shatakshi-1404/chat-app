const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    isOnline: { type: Boolean, default: false },
    lastSeen: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
