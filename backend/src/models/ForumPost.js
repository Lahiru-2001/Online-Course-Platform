const mongoose = require('mongoose');

// Schema for replies on a forum post
const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'You can\'t post an empty reply!'],
    },
  },
  {
    timestamps: true, // When was the reply posted
  }
);

// The main Forum Post schema
const forumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Every discussion needs a good title.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'What do you want to talk about?'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Optional: Attach this post to a specific course
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    // Keep track of the conversation
    replies: [replySchema],
  },
  {
    timestamps: true, // Tells us when the post was created/updated
  }
);

module.exports = mongoose.model('ForumPost', forumPostSchema);
