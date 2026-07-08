import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

export const getInstructorDashboard = async (req, res) => {
    try {

        const instructorId = req.user._id;

        // Logged instructor
        const instructor = await User.findById(instructorId)
            .select("-password");

        // Courses
        const courses = await Course.find({
            instructor: instructorId
        });

        const totalCourses = courses.length;

        const publishedCourses = courses.filter(
            c => c.status === "Published"
        ).length;

        // Total Students
        const totalStudents = await Enrollment.countDocuments({
            instructor: instructorId
        });

        // Earnings
        const earningResult = await Enrollment.aggregate([
            {
                $match: {
                    instructor: instructorId,
                    paymentStatus: "Completed"
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$paymentAmount"
                    }
                }
            }
        ]);

        const totalEarnings =
            earningResult.length > 0
                ? earningResult[0].total
                : 0;

        // Reviews
        let totalReviews = 0;
        let ratingSum = 0;

        courses.forEach(course => {
            totalReviews += course.totalRatings || 0;
            ratingSum +=
                (course.averageRating || 0) *
                (course.totalRatings || 0);
        });

        const averageRating =
            totalReviews > 0
                ? (ratingSum / totalReviews).toFixed(1)
                : 0;

        // Recent Courses
        const recentCourses = await Course.find({
            instructor: instructorId
        })
            .sort({ createdAt: -1 })
            .limit(5);

        // Monthly Enrollments
        const monthly = await Enrollment.aggregate([
            {
                $match: {
                    instructor: instructorId
                }
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt"
                        }
                    },
                    students: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);

        return res.json({
            success: true,

            instructor,
            statistics: {

                totalCourses,
                publishedCourses,
                totalStudents,
                totalEarnings,
                totalReviews,
                averageRating

            },

            recentCourses,
            monthly

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};