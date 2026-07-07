const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Function to handle student enrollment
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // We should be getting this from an auth middleware eventually!
    // For now, let's just fallback to req.body so we can test it in Postman.
    const userId = req.user ? req.user.id : req.body.userId; 

    // Can't enroll if we don't know who you are or what you want to study
    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Hold up! We need both a course ID and a user ID.' });
    }

    // Double check if the course actually exists in our DB
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: 'Hmm, we couldn\'t find that course. Are you sure the ID is right?' });
    }

    // Check if the student is trying to enroll again
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course! Dive into learning instead.' });
    }

    // All good? Let's create the enrollment record
    const newEnrollment = new Enrollment({
      user: userId,
      course: courseId,
    });

    await newEnrollment.save();
    // console.log(`User ${userId} just enrolled in ${courseId}`); // uncomment for debugging

    res.status(201).json({
      message: 'Awesome! You are successfully enrolled.',
      enrollment: newEnrollment,
    });
    
  } catch (error) {
    console.error('Yikes, something broke during enrollment:', error);
    res.status(500).json({ message: 'Server is acting up. Try again later.' });
  }
};

// Fetch courses for the logged-in student
const getMyCourses = async (req, res) => {
  try {
    // Again, fallback to URL params if auth isn't setup yet
    const userId = req.user ? req.user.id : req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'We need your user ID to fetch your courses.' });
    }

    // Grab the enrollments and populate the course data so the frontend gets everything at once
    const enrollments = await Enrollment.find({ user: userId }).populate('course');

    // Massage the data a bit to make it easier for the frontend devs to use
    const courses = enrollments.map((record) => ({
      enrollmentId: record._id,
      progress: record.progress,
      enrolledAt: record.createdAt,
      courseData: record.course,
    }));

    res.status(200).json(courses);
  } catch (error) {
    console.error('Failed fetching user courses:', error);
    res.status(500).json({ message: 'Oops, failed to grab your courses.' });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
};
