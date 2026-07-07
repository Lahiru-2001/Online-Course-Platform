const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Payment = require('../models/Payment');

// @desc    Get platform-wide analytics
// @route   GET /api/reports/analytics
// @access  Private (Admin)
const getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments({});
    const totalEnrollments = await Enrollment.countDocuments({});
    const completedCourses = await Enrollment.countDocuments({ status: 'completed' });

    res.json({
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
      completedCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue report
// @route   GET /api/reports/revenue
// @access  Private (Admin)
const getRevenueReport = async (req, res) => {
  try {
    // Placeholder: aggregate payments by month
    res.json({
      message: 'Revenue report',
      data: [
        { month: 'MAR', amount: 4000000 },
        { month: 'APR', amount: 6000000 },
        { month: 'MAY', amount: 9000000 },
        { month: 'JUN', amount: 8000000 },
        { month: 'JUL', amount: 11000000 },
        { month: 'AUG', amount: 12450200 },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollment trends
// @route   GET /api/reports/enrollments
// @access  Private (Admin)
const getEnrollmentReport = async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments({});
    const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
    const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });

    res.json({ totalEnrollments, activeEnrollments, completedEnrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnalytics, getRevenueReport, getEnrollmentReport };
