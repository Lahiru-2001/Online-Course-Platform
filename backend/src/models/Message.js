const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender reference is required"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver reference is required"],
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      minlength: [1, "Message content cannot be empty"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up conversation fetching between two users
MessageSchema.index({ sender: 1, receiver: 1 });
MessageSchema.index({ receiver: 1, sender: 1 });

module.exports = mongoose.model("Message", MessageSchema);

