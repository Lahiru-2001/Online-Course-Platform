import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import StudentProfile from "../models/StudentProfile.js";
import { hashPassword } from "../utils/hashPassword.js";


// GET STUDENT PROFILE
export const getStudentProfile = async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user || user.userType !== "Student") {

            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });

        }

        const profile = await StudentProfile.findOne({ userId });
        if (!profile) {

            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });

        }

        return res.status(200).json({

            success: true,
            student: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone,
                bio: profile.bio,
                profileImage: profile.profileImage,
                email: user.email,
                fullName: user.fullName,

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

// UPDATE STUDENT PROFILE
export const updateStudentProfile = async (req, res) => {

    try {

        const userId = req.user.id;
        const {
            firstName,
            lastName,
            phone,
            email,
            password,
            bio,
        } = req.body;

        // Find User
        const user = await User.findById(userId);

        if (!user || user.userType !== "Student") {

            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });

        }

        // Find Profile
        const profile = await StudentProfile.findOne({ userId });

        if (!profile) {

            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });

        }

        // Validation
        if (!firstName || firstName.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "First Name is required.",
            });

        }

        if (!lastName || lastName.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Last Name is required.",
            });

        }

        if (!phone || phone.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Phone Number is required.",
            });

        }

        if (!email || email.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Email Address is required.",
            });

        }

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Email Address.",
            });

        }

        // Duplicate Email
        const existingUser = await User.findOne({

            email: email.toLowerCase(),

            _id: { $ne: userId },

        });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists.",
            });

        }

        // Update User
        user.fullName = `${firstName} ${lastName}`;

        user.email = email.toLowerCase();

        if (password && password.trim() !== "") {

            if (password.length < 6) {

                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 6 characters.",
                });

            }

            user.password = await hashPassword(password);

        }

        await user.save();


        // Update Student Profile
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.phone = phone;
        profile.bio = bio || "";

        if (req.file) {

            profile.profileImage =
                `/uploads/images/${req.file.filename}`;

        }

        await profile.save();
        return res.status(200).json({

            success: true,
            message: "Profile updated successfully.",
            student: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone,
                bio: profile.bio,
                profileImage: profile.profileImage,
                email: user.email,
                fullName: user.fullName,

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

export const getStudentDashboard = async (req, res) => {
    try {

        const studentId = req.user._id;

        const enrollments = await Enrollment.find({
            student: studentId
        }).populate("course");

        // Keep only enrollments with existing courses
        const validEnrollments = enrollments.filter(
            enrollment => enrollment.course
        );

        const enrolledCourses = validEnrollments.length;

        const completedCourses = validEnrollments.filter(
            enrollment => enrollment.completed
        ).length;

        const ongoingCourses = validEnrollments.filter(
            enrollment => !enrollment.completed
        ).length;

        const certificatesEarned = completedCourses;

        // Course Progress Summary

        const courseProgress = validEnrollments.map(enrollment => ({
            courseId: enrollment.course._id,
            courseTitle: enrollment.course.title,
            progress: enrollment.progress
        }));

        // Monthly Learning Progress
        const monthMap = {};

        validEnrollments.forEach(enrollment => {

            const month = enrollment.updatedAt.toLocaleString(
                "default",
                { month: "short" }
            );

            if (!monthMap[month]) {
                monthMap[month] = 0;
            }

            monthMap[month] += Math.round(
                enrollment.progress / 10
            );

        });

        const monthlyLearningProgress = Object.keys(monthMap).map(
            month => ({
                month,
                hours: monthMap[month]
            })
        );


        // Upcoming Deadlines
        const upcomingDeadlines = [];

        validEnrollments.forEach(enrollment => {

            if (!enrollment.course.lessons) return;

            enrollment.course.lessons.forEach(lesson => {

                if (
                    lesson.assignment &&
                    lesson.assignment.title &&
                    lesson.assignment.dueDate
                ) {

                    upcomingDeadlines.push({
                        course: enrollment.course.title,
                        assignment: lesson.assignment.title,
                        dueDate: lesson.assignment.dueDate
                    });

                }

            });

        });

        upcomingDeadlines.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );


        // Total Learning Hours
        let totalLearningHours = 0;

        validEnrollments.forEach(enrollment => {

            totalLearningHours += Math.round(
                ((enrollment.course.totalDuration || 0) / 60) *
                (enrollment.progress / 100)
            );

        });


        return res.status(200).json({

            success: true,

            stats: {
                enrolledCourses,
                completedCourses,
                ongoingCourses,
                certificatesEarned,
                totalLearningHours
            },

            courseProgress,
            monthlyLearningProgress,
            upcomingDeadlines

        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};