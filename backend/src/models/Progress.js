const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson reference is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["On Progress", "Completed"],
        message: "{VALUE} is not a valid progress status",
      },
      default: "On Progress",
    },
    timeSpent: {
      type: Number, // in minutes/seconds
      default: 0,
      min: [0, "Time spent cannot be negative"],
    },
    notes: {
      title: { type: String, default: "", trim: true },
      takeaways: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

// One progress record per student per lesson
ProgressSchema.index({ student: 1, lesson: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);

