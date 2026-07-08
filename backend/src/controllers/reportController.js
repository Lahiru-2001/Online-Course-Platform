import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// ADMIN REPORT
export const getAdminReport = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "fullName email")
      .populate("course", "title instructor")
      .populate("instructor", "fullName email");

    const totalStudents = new Set(
      enrollments.map((e) => e.student?._id?.toString())
    ).size;

    const totalCourses = await Course.countDocuments();

    const completedStudents = enrollments.filter(
      (e) => e.completed === true
    ).length;

    const averageProgress =
      enrollments.length > 0
        ? (
          enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) /
          enrollments.length
        ).toFixed(2)
        : 0;

    const students = enrollments.map((e) => ({
      enrollmentId: e._id,

      student: {
        id: e.student?._id,
        fullName: e.student?.fullName,
        email: e.student?.email,
      },

      instructor: {
        id: e.instructor?._id,
        fullName: e.instructor?.fullName,
        email: e.instructor?.email,
      },

      course: {
        id: e.course?._id,
        title: e.course?.title,
      },

      progress: e.progress,
      completed: e.completed,
      currentLesson: e.currentLesson,
      completedLessons: e.completedLessons,
      enrolledAt: e.createdAt,
    }));

    const courses = await Course.find()
      .populate("instructor", "fullName email")
      .lean();

    const courseStats = courses.map((course) => {
      const list = enrollments.filter(
        (e) =>
          e.course &&
          e.course._id.toString() === course._id.toString()
      );

      const avg =
        list.length > 0
          ? (
            list.reduce((sum, e) => sum + (e.progress || 0), 0) /
            list.length
          ).toFixed(2)
          : 0;

      return {
        id: course._id,
        title: course.title,

        instructor: {
          id: course.instructor?._id,
          fullName: course.instructor?.fullName,
        },

        enrolledStudents: list.length,

        completedStudents: list.filter(
          (e) => e.completed
        ).length,

        averageProgress: Number(avg),
      };
    });

    return res.status(200).json({
      success: true,

      summary: {
        totalStudents,
        totalCourses,
        completedStudents,
        averageProgress,
      },

      courses: courseStats,

      students,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate admin report.",
    });
  }
};

// INSTRUCTOR REPORT
export const getInstructorReport = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const courses = await Course.find({
      instructor: instructorId,
    });

    const courseIds = courses.map((c) => c._id);
    const enrollments = await Enrollment.find({
      course: { $in: courseIds },
    })
      .populate("student", "fullName email")
      .populate("course", "title");

    const totalStudents = enrollments.length;

    const completedStudents = enrollments.filter(
      (e) => e.completed
    ).length;

    const averageProgress =
      enrollments.length > 0
        ? (
          enrollments.reduce(
            (sum, e) => sum + (e.progress || 0),
            0
          ) / enrollments.length
        ).toFixed(2)
        : 0;

    const courseStats = courses.map((course) => {
      const list = enrollments.filter(
        (e) =>
          e.course &&
          e.course._id.toString() === course._id.toString()
      );

      const avg =
        list.length > 0
          ? (
            list.reduce(
              (sum, e) => sum + (e.progress || 0),
              0
            ) / list.length
          ).toFixed(2)
          : 0;

      return {
        id: course._id,
        title: course.title,

        enrolledStudents: list.length,

        completedStudents: list.filter(
          (e) => e.completed
        ).length,

        averageProgress: Number(avg),
      };
    });

    const students = enrollments.map((e) => ({
      enrollmentId: e._id,

      student: {
        id: e.student?._id,
        fullName: e.student?.fullName,
        email: e.student?.email,
      },

      course: {
        id: e.course?._id,
        title: e.course?.title,
      },

      progress: e.progress,
      completed: e.completed,
      currentLesson: e.currentLesson,
      completedLessons: e.completedLessons,
      enrolledAt: e.createdAt,
    }));

    return res.status(200).json({
      success: true,

      summary: {
        totalCourses: courses.length,
        totalStudents,
        completedStudents,
        averageProgress,
      },

      courses: courseStats,

      students,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate instructor report.",
    });
  }
};