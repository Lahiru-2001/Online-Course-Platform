import mongoose from "mongoose";

const instructorProfileSchema = new mongoose.Schema(
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

        specialization: {
            type: String,
            default: "",
            trim: true,
        },

        title: {
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

export default mongoose.model(
    "InstructorProfile",
    instructorProfileSchema
);