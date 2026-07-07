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
      enum: {
        values: ["About Courses", "Forum Activities", "System Updates"],
        message: "{VALUE} is not a valid notification category",
      },
      required: [true, "Notification category is required"],
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Notification body is required"],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      enum: {
        values: ["assignment", "grade", "forum", "system"],
        message: "{VALUE} is not a valid notification icon type",
      },
      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast retrieval of recipient's notifications (especially filter by unread/read)
NotificationSchema.index({ recipient: 1, read: 1 });
NotificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", NotificationSchema);

