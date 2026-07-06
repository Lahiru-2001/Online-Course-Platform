const mongoose = require('mongoose');

// Define what a Course looks like in our database
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Come on, a course needs a catchy title!'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please tell us what this course is about.'],
    },
    // Which instructor created this? Link it to the User model
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      default: 0, // Free by default? Awesome!
    },
    thumbnail: {
      type: String,
      default: 'default-course.png', // Fallback image just in case
    },
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Course', courseSchema);
