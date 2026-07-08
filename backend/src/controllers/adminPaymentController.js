import Enrollment from "../models/Enrollment.js";


// GET ADMIN PAYMENT OVERVIEW

export const getAdminPayments = async (req, res) => {
  try {
    // Get all completed enrollments
    const enrollments = await Enrollment.find({
      paymentStatus: "Completed",
    })
      .populate("student", "fullName email")
      .populate("course", "title")
      .populate("instructor", "fullName");

    let totalRevenue = 0;

    const transactions = enrollments.map((item) => {
      const amount = Number(item.paymentAmount || 0);

      totalRevenue += amount;

      const adminCommission = amount * 0.2;
      const instructorAmount = amount * 0.8;

      return {
        id: item._id,

        transactionId:
          item.transactionId ||
          item.paymentId ||
          item._id.toString().slice(-8).toUpperCase(),

        student: item.student
          ? item.student.fullName
          : "Unknown Student",

        studentEmail: item.student
          ? item.student.email
          : "",

        course: item.course
          ? item.course.title
          : "Unknown Course",

        instructor: item.instructor
          ? item.instructor.fullName
          : "Unknown Instructor",

        paymentDate: item.updatedAt || item.createdAt,
        paymentMethod: item.paymentMethod || "Online",
        totalAmount: amount,
        adminAmount: adminCommission,
        instructorAmount,
        paymentStatus: item.paymentStatus,
      };
    });

    const totalAdminRevenue = totalRevenue * 0.2;
    const totalInstructorRevenue = totalRevenue * 0.8;

    const completedPayments = transactions.filter(
      (item) => item.paymentStatus === "Completed"
    ).length;

    const processingPayments = transactions.filter(
      (item) => item.paymentStatus === "Processing"
    ).length;

    const failedPayments = transactions.filter(
      (item) => item.paymentStatus === "Failed"
    ).length;

    return res.status(200).json({
      success: true,

      summary: {
        totalRevenue,
        adminRevenue: totalAdminRevenue,
        instructorRevenue: totalInstructorRevenue,
        completedPayments,
        processingPayments,
        failedPayments,
      },

      transactions,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};