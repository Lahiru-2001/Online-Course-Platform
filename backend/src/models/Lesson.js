const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
    documents: [
      {
        name: { type: String, required: true },
        size: { type: String, required: true },
        downloadUrl: { type: String, required: true },
      },
    ],
    order: {
      type: Number,
      required: [true, "Lesson sequence order is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lesson", LessonSchema);
