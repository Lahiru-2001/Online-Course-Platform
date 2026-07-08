import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    type: {
      type: String,
      default: "private",
      enum: ["private"],
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    lastMessageAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({
  participants: 1,
});

export default mongoose.model(
  "Conversation",
  conversationSchema
);