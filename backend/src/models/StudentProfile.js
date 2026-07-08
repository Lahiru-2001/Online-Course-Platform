import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
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
            default: "",
            trim: true,
        },

        bio: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "/uploads/images/default-profile.png",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("StudentProfile", studentProfileSchema);