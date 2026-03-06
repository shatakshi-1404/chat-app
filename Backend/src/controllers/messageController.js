const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { getIO } = require("../sockets/socket");


// SEND MESSAGE
exports.sendMessage = async (req, res) => {

  try {

    const { conversationId, text } = req.body;

    const message = await Message.create({
      sender: req.user.id,
      conversation: conversationId,
      text
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id
    });

    const populatedMessage = await message.populate("sender", "name email");

    // emit socket event
    const io = getIO();

    io.emit("receiveMessage", populatedMessage);

    res.status(201).json(populatedMessage);

  } catch (error) {
    res.status(500).json({ message: "Message send failed" });
  }

};



// GET MESSAGES
exports.getMessages = async (req, res) => {

  try {

    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId
    })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }

};
