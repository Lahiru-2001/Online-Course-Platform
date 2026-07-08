import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalEarnings: {
      type: Number,
      required: true,
      default: 0,
    },

    availableBalance: {
      type: Number,
      required: true,
      default: 0,
    },

    withdrawAmount: {
      type: Number,
      required: true,
    },

    remainingBalance: {
      type: Number,
      required: true,
    },

    bankName: {
      type: String,
      default: "",
    },

    accountName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Withdrawal", withdrawalSchema);