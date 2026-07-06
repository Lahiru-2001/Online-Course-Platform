const mongoose = require('mongoose');

// Keeps track of who is enrolled in what
const enrollmentSchema = new mongoose.Schema(
  {
    // The student
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The course they're taking
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    progress: {
      type: Number,
      default: 0, // Percentage of the course they've completed so far
    },
  },
  {
    timestamps: true,
  }
);

// Very important: A user shouldn't be able to enroll in the same course twice!
// This index enforces that at the database level.
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
