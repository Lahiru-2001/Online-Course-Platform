const mongoose = require('mongoose');

// Schema for individual chat messages
const chatMessageSchema = new mongoose.Schema(
  {
    // Who sent it?
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Who is it for? Could be a specific user or a room/course ID
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional: because maybe it's a group chat linked to a course instead
    },
    // If it's a group chat, link it to the course
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    // The actual text
    message: {
      type: String,
      required: [true, 'Can\'t send an empty message!'],
    },
    // Useful for showing "read receipts" later
    isRead: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true, // We need this to order messages correctly
  }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
