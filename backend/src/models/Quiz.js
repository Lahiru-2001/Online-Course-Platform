const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Lesson Quiz",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson reference is required"],
      unique: true, // One quiz per lesson
    },
    questions: [
      {
        questionText: {
          type: String,
          required: [true, "Question text is required"],
        },
        options: {
          type: [String],
          validate: {
            validator: function (v) {
              return v.length >= 2;
            },
            message: "A question must have at least 2 options",
          },
          required: true,
        },
        correctOptionIndex: {
          type: Number,
          required: [true, "Correct option index is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
