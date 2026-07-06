const ChatMessage = require('../models/ChatMessage');

// Send a message to a user or a course chat room
const sendMessage = async (req, res) => {
  try {
    const { receiverId, courseId, message } = req.body;
    const senderId = req.user ? req.user.id : req.body.senderId;

    if (!senderId || !message) {
      return res.status(400).json({ message: 'We need both a sender and a message to deliver.' });
    }

    if (!receiverId && !courseId) {
      return res.status(400).json({ message: 'Who are you sending this to? Provide a receiverId or a courseId.' });
    }

    const newMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId || null,
      courseId: courseId || null,
      message: message,
    });

    await newMessage.save();

    // In a real app, this is where you'd emit a Socket.io event to the receiver!
    // io.to(receiverId).emit('newMessage', newMessage);

    res.status(201).json({
      message: 'Message sent!',
      chatMessage: newMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send the message. Are the wires crossed?' });
  }
};

// Fetch chat history between two users or for a specific course room
const getMessages = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.query.userId;
    const { partnerId, courseId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'Need your user ID to fetch messages.' });
    }

    let query = {};

    if (courseId) {
      // It's a group chat for a course
      query = { courseId: courseId };
    } else if (partnerId) {
      // It's a direct message between userId and partnerId
      query = {
        $or: [
          { sender: userId, receiver: partnerId },
          { sender: partnerId, receiver: userId },
        ]
      };
    } else {
      return res.status(400).json({ message: 'Provide either a partnerId or a courseId to fetch the chat.' });
    }

    // Grab the messages and populate sender details so we can show their name/avatar
    const messages = await ChatMessage.find(query)
      .populate('sender', 'name profilePicture')
      .sort({ createdAt: 1 }); // Oldest first for a chat interface!

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to load chat history.' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
