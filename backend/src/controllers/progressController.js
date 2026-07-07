const Progress = require('../models/Progress');
const Enrollment = require('../models/Enrollment');
const Lesson = require('../models/Lesson');

// @desc    Update/create progress for a specific lesson & calculate overall course progress
// @route   PUT /api/progress/update
// @access  Private (Student)
const updateProgress = async (req, res) => {
  try {
    const { lessonId, status, timeSpent, notes } = req.body;

    if (!lessonId) {
      return res.status(400).json({ success: false, message: 'lessonId is required' });
    }

    // 1. Find the lesson to identify which course it belongs to
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    const courseId = lesson.course;

    // 2. Find or Create lesson progress
    let progress = await Progress.findOne({ student: req.user.id, lesson: lessonId });
    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        lesson: lessonId,
        status: status || 'On Progress',
        timeSpent: timeSpent || 0,
        notes: notes || { title: '', takeaways: [] }
      });
    } else {
      if (status) progress.status = status;
      if (timeSpent) progress.timeSpent += timeSpent;
      if (notes) progress.notes = notes;
      await progress.save();
    }

    // 3. Calculate overall course progress percentage
    const totalLessons = await Lesson.countDocuments({ course: courseId });
    let progressPercentage = 0;

    if (totalLessons > 0) {
      // Find all completed lessons of this course by the student
      const courseLessons = await Lesson.find({ course: courseId }).select('_id');
      const lessonIds = courseLessons.map(l => l._id);

      const completedCount = await Progress.countDocuments({
        student: req.user.id,
        lesson: { $in: lessonIds },
        status: 'Completed'
      });

      progressPercentage = Math.round((completedCount / totalLessons) * 100);
    }

    // 4. Update the enrollment progress
    let enrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });
    if (enrollment) {
      enrollment.progress = progressPercentage;
      if (progressPercentage === 100) {
        enrollment.status = 'completed';
      }
      await enrollment.save();
    }

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      progress,
      progressPercentage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get overall course progress for a student
// @route   GET /api/progress/:courseId
// @access  Private (Student)
const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment record not found for this course' });
    }

    // Get individual lesson progress records
    const courseLessons = await Lesson.find({ course: courseId }).select('_id');
    const lessonIds = courseLessons.map(l => l._id);

    const lessonProgressList = await Progress.find({
      student: req.user.id,
      lesson: { $in: lessonIds }
    }).populate('lesson', 'title order');

    res.status(200).json({
      success: true,
      message: 'Progress retrieved successfully',
      progressPercentage: enrollment.progress,
      status: enrollment.status,
      lessonProgress: lessonProgressList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  updateProgress,
  getProgress
};
