const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Handle student course enrollment
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Fallback to req.body for testing purposes until auth middleware is fully integrated
    const userId = req.user ? req.user.id : req.body.userId; 

    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID are required.' });
    }

    // Verify if the course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Check for existing enrollment to prevent duplicates
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course.' });
    }

    // Create new enrollment record
    const newEnrollment = new Enrollment({
      user: userId,
      course: courseId,
    });

    await newEnrollment.save();

    res.status(201).json({
      message: 'Enrollment successful.',
      enrollment: newEnrollment,
    });
    
  } catch (error) {
    console.error('Error during course enrollment:', error);
    res.status(500).json({ message: 'An error occurred during enrollment.' });
  }
};

// Retrieve all courses for the authenticated student
const getMyCourses = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required to fetch courses.' });
    }

    // Fetch enrollments and populate the related course data
    const enrollments = await Enrollment.find({ user: userId }).populate('course');

    // Format the response for the frontend
    const courses = enrollments.map((record) => ({
      enrollmentId: record._id,
      progress: record.progress,
      enrolledAt: record.createdAt,
      courseData: record.course,
    }));

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Failed to fetch user courses.' });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
};
