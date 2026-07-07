const mongoose = require('mongoose');

// Where a student's actual work gets saved
const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The actual file they uploaded (usually an S3 link or similar)
    fileUrl: {
      type: String,
      required: [true, 'Please provide the file URL so the instructor can see your work.'],
    },
    // The instructor will grade this later
    grade: {
      type: Number,
      default: null, 
    },
    // Any comments from the instructor
    feedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
