const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author reference is required"],
    },
    title: {
      type: String,
      required: [true, "Forum post title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Forum post content is required"],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Optional: linked to a specific course
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up queries for course-specific forum posts and user's posts
ForumSchema.index({ course: 1 });
ForumSchema.index({ author: 1 });

module.exports = mongoose.model("Forum", ForumSchema);

