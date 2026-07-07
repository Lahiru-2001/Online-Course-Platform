const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment reference is required"],
    },
    fileUrl: {
      type: String,
      required: [true, "Submission file URL/path is required"],
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: Number, // percentage (0 - 100)
      min: 0,
      max: 100,
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// One submission per student per assignment
SubmissionSchema.index({ student: 1, assignment: 1 }, { unique: true });

module.exports = mongoose.model("Submission", SubmissionSchema);
