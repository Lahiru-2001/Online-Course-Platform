import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "uploads/images/default-profile-image.webp",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);