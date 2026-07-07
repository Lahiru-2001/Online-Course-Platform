const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Payment amount cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed", "failed"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    transactionId: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up queries by student or course
PaymentSchema.index({ student: 1 });
PaymentSchema.index({ course: 1 });

module.exports = mongoose.model("Payment", PaymentSchema);

