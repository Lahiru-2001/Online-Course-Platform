const mongoose = require('mongoose');

// Keeps track of alerts we need to show the user
const notificationSchema = new mongoose.Schema(
  {
    // Who is this notification for?
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The actual text to display
    message: {
      type: String,
      required: [true, 'A notification needs a message!'],
    },
    // So we know whether to highlight it or not
    isRead: {
      type: Boolean,
      default: false,
    },
    // Optional: categorizing notifications makes filtering easier
    type: {
      type: String,
      enum: ['system', 'course', 'message', 'forum'],
      default: 'system',
    },
    // Optional link if clicking the notification should take them somewhere
    link: {
      type: String,
    }
  },
  {
    timestamps: true, // We definitely need to know when this was sent
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
