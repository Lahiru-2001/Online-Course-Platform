const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipient reference is required"],
    },
    category: {
      type: String,
      enum: ["About Courses", "Forum Activities", "System Updates"],
      required: [true, "Notification category is required"],
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
    },
    body: {
      type: String,
      required: [true, "Notification body is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      enum: ["assignment", "grade", "forum", "system"],
      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
