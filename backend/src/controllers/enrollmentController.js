import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// Enroll Student
export const enrollCourse = async (req, res) => {
    try {

        const studentId = req.user._id;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        const alreadyEnrolled = await Enrollment.findOne({
            student: studentId,
            course: courseId
        });

        if (alreadyEnrolled) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in this course."
            });
        }

        const enrollment = await Enrollment.create({

            student: studentId,
            instructor: course.instructor,
            course: course._id,
            paymentStatus: "Completed",
            paymentAmount:
                course.pricing?.isFree
                    ? 0
                    : course.pricing?.discountPrice,

            progress: 0,
            completedLessons: [],
            currentLesson: 0,
            completed: false

        });

        course.enrolledStudents += 1;
        await course.save();
        return res.status(201).json({
            success: true,
            message:
                "Your Payment Successful!.. Enjoyed Your Learning",
            enrollment

        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message

        });

    }
};


// Logged Student Courses
export const getMyCourses = async (req, res) => {

    try {

        const studentId = req.user._id;
        const enrollments = await Enrollment.find({
            student: studentId

        })
            .populate("course")
            .populate("instructor", "fullName");

        return res.json({
            success: true,
            courses: enrollments

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message

        });

    }

};

// Single Enrollment
export const getEnrollment = async (req, res) => {

    try {
        const studentId = req.user._id;
        const { courseId } = req.params;
        const enrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId

        })
            .populate("course")
            .populate("instructor", "fullName");

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found."

            });

        }
        return res.json({
            success: true,
            enrollment

        });

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Completed Course Details
export const getCompletedCourse = async (req, res) => {
    try {

        const studentId = req.user._id;
        const { courseId } = req.params;

        const enrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId
        })
            .populate("course")
            .populate("instructor", "fullName email");

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found."
            });
        }

        const course = enrollment.course;

        return res.json({
            success: true,

            data: {

                enrollment: {
                    _id: enrollment._id,
                    progress: enrollment.progress,
                    completed: enrollment.completed,
                    currentLesson: enrollment.currentLesson,
                    completedLessons: enrollment.completedLessons,
                    paymentStatus: enrollment.paymentStatus,
                    paymentAmount: enrollment.paymentAmount,
                    enrolledAt: enrollment.createdAt
                },

                instructor: enrollment.instructor,

                course: {
                    _id: course._id,
                    title: course.title,
                    description: course.description,
                    image: course.image,
                    category: course.category,
                    duration: course.duration,
                    language: course.language,
                    offeredBy: course.offeredBy,
                    difficulty: course.difficulty,

                    totalLessons: course.totalLessons,
                    totalVideos: course.totalVideos,
                    totalDocuments: course.totalDocuments,
                    totalAssignments: course.totalAssignments,
                    totalQuizzes: course.totalQuizzes,
                    totalDuration: course.totalDuration,

                    lessons: course.lessons,
                    certificate: course.certificate
                }

            }

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Progress
export const updateProgress = async (req, res) => {

    try {
        const studentId = req.user._id;
        const { courseId } = req.params;
        const {
            currentLesson,
            progress,
            completedLessons

        } = req.body;
        const enrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId

        });
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found."

            });

        }
        enrollment.currentLesson = currentLesson;
        enrollment.progress = progress;
        enrollment.completedLessons = completedLessons;
        if (progress >= 100) {
            enrollment.completed = true;

        }

        await enrollment.save();
        return res.json({
            success: true,
            message: "Progress updated.",
            enrollment

        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message

        });

    }

};