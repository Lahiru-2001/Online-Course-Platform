const mongoose = require('mongoose');

// Helper schema just for questions so the main Quiz schema doesn't look too messy
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String, // e.g., ["A", "B", "C", "D"] or actual text
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true, // Don't forget to tell us the answer!
  },
});

// The main Quiz model
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Every quiz needs a good title.'],
    },
    // The course this quiz belongs to
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    // Array of questions using the sub-schema above
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
