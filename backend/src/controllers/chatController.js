const ChatMessage = require('../models/ChatMessage');

// Send a chat message to a user or a specific course room
const sendMessage = async (req, res) => {
  try {
    const { receiverId, courseId, message } = req.body;
    const senderId = req.user ? req.user.id : req.body.senderId;

    if (!senderId || !message) {
      return res.status(400).json({ message: 'Sender ID and message content are required.' });
    }

    if (!receiverId && !courseId) {
      return res.status(400).json({ message: 'Either a Receiver ID or a Course ID must be provided.' });
    }

    const newMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId || null,
      courseId: courseId || null,
      message: message,
    });

    await newMessage.save();

    // Socket.io integration placeholder for real-time delivery
    // io.to(receiverId || courseId).emit('newMessage', newMessage);

    res.status(201).json({
      message: 'Message sent successfully.',
      chatMessage: newMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'An error occurred while sending the message.' });
  }
};

// Retrieve chat history between two users or within a course room
const getMessages = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.query.userId;
    const { partnerId, courseId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required to fetch chat history.' });
    }

    let query = {};

    if (courseId) {
      // Fetch messages for a course group chat
      query = { courseId: courseId };
    } else if (partnerId) {
      // Fetch direct messages between two specific users
      query = {
        $or: [
          { sender: userId, receiver: partnerId },
          { sender: partnerId, receiver: userId },
        ]
      };
    } else {
      return res.status(400).json({ message: 'A partnerId or courseId is required to fetch messages.' });
    }

    // Populate sender details for the frontend UI
    const messages = await ChatMessage.find(query)
      .populate('sender', 'name profilePicture')
      .sort({ createdAt: 1 }); // Sort chronologically (oldest first)

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to retrieve chat history.' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
