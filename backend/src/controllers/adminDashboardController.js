import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getAdminDashboard = async (req, res) => {
  try {

    // User Statistics
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      userType: "Student",
    });

    const totalInstructors = await User.countDocuments({
      userType: "Instructor",
    });

    const totalAdmins = await User.countDocuments({
      userType: "Administrator",
    });


    // Course Statistics

    const totalCourses = await Course.countDocuments();

    const publishedCourses = await Course.countDocuments({
      status: "Published",
    });

    const pendingCourses = await Course.countDocuments({
      status: "Pending",
    });

    const draftCourses = await Course.countDocuments({
      status: "Draft",
    });


    // Enrollment Statistics

    const totalEnrollments = await Enrollment.countDocuments();

    // Revenue

    const paidEnrollments = await Enrollment.find({
      paymentStatus: "Completed",
    });

    const totalRevenue = paidEnrollments.reduce(
      (sum, item) => sum + Number(item.paymentAmount || 0),
      0
    );

    // Recent Users

    const recentUsers = await User.find()
      .select("fullName email userType status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Courses

    const recentCourses = await Course.find()
      .populate("instructor", "fullName")
      .select("title status createdAt instructor")
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly Enrollment Chart

    const monthlyEnrollments = await Enrollment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          enrollments: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = monthNames.map((month, index) => {
      const found = monthlyEnrollments.find(
        (m) => m._id === index + 1
      );

      return {
        month,
        enrollments: found ? found.enrollments : 0,
      };
    });

    // Response

    return res.status(200).json({
      success: true,

      statistics: {
        totalUsers,
        totalStudents,
        totalInstructors,
        totalAdmins,

        totalCourses,
        publishedCourses,
        pendingCourses,
        draftCourses,

        totalEnrollments,
        totalRevenue,
      },

      recentUsers,

      recentCourses,

      chartData,
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
      error: error.message,
    });
  }
};