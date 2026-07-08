import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import InstructorProfile from "../models/InstructorProfile.js";
import { hashPassword, comparePassword, } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";

// REGISTER STUDENT
export const registerStudent = async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await hashPassword(password);

        const student = await User.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            userType: "Student",
        });

        const names = fullName.trim().split(" ");
        const firstName = names[0];

        const lastName =
            names.length > 1
                ? names.slice(1).join(" ")
                : "";
        -
            // Create Student Profile

            await StudentProfile.create({
                userId: student._id,
                firstName,
                lastName,
                phone: "",
                bio: "",
                profileImage:
                    "/uploads/images/default-profile.png",

            });

        return res.status(201).json({

            success: true,
            message: "Student registration successful.",
            user: {

                id: student._id,
                fullName: student.fullName,
                email: student.email,
                userType: student.userType,
                status: student.status,

            },

        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};


export const registerInstructor = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
        } = req.body;

        // Check duplicate email
        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered.",
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);
        // Create Instructor User
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            userType: "Instructor",
            status: "Active",
        });


        const names = fullName.trim().split(" ");
        const firstName = names[0];
        const lastName =
            names.length > 1
                ? names.slice(1).join(" ")
                : "";

        // Create Instructor Profile
        await InstructorProfile.create({
            userId: user._id,
            firstName,
            lastName,
            specialization: "",
            title: "",
            bio: "",
            profileImage: "/uploads/images/default-profile.png",
        });

        // Success Response

        return res.status(201).json({

            success: true,
            message: "Instructor account created successfully.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
                status: user.status,

            },

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",

        });

    }

};

// LOGIN USER
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered.",
            });
        }

        const isMatch = await comparePassword(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        if (user.status !== "Active") {
            return res.status(403).json({
                success: false,
                message:
                    "Your account is inactive. Please contact the administrator.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                userType: user.userType,
                status: user.status,

            },

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",

        });

    }

};