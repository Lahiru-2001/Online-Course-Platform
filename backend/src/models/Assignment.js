const mongoose = require('mongoose');

// The blueprint for a course assignment
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Give this assignment a name!'],
    },
    description: {
      type: String,
      required: [true, 'Explain what the students need to do.'],
    },
    // Links back to the course it belongs to
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    // When is this due? (Optional, but good to have)
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
