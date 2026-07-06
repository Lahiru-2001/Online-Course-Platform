const mongoose = require('mongoose');

// Tracks a student's answer sheet for a quiz
const quizSubmissionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The final calculated score
    score: {
      type: Number,
      required: true,
    },
    // Keep a record of exactly what they answered
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId },
        selectedOption: { type: String }, // What they picked
        isCorrect: { type: Boolean },     // Was it right?
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuizSubmission', quizSubmissionSchema);
