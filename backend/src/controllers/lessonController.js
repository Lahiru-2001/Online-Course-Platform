const Lesson = require('../models/Lesson');

// @desc    Get all lessons for a course
// @route   GET /api/lessons
// @access  Public
const getLessons = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) {
      return res.status(400).json({ message: 'courseId query parameter is required' });
    }
    const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new lesson
// @route   POST /api/lessons
// @access  Private (Instructor)
const createLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, course, order } = req.body;

    if (!title || !course || order === undefined) {
      return res.status(400).json({ message: 'Title, course, and order are required' });
    }

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      course,
      order
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a lesson
// @route   PUT /api/lessons/:id
// @access  Private (Instructor)
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a lesson
// @route   DELETE /api/lessons/:id
// @access  Private (Instructor/Admin)
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload learning materials (PDF, Video, etc.)
// @route   POST /api/lessons/:id/upload
// @access  Private (Instructor)
const uploadLearningMaterials = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    let documentData = {};
    if (req.file) {
      documentData = {
        name: req.file.originalname,
        size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
        downloadUrl: req.file.path // local upload path or Cloudinary URL
      };
    } else if (req.body.name && req.body.downloadUrl) {
      // Fallback fallback to support post requests with manual URL
      documentData = {
        name: req.body.name,
        size: req.body.size || 'Unknown size',
        downloadUrl: req.body.downloadUrl
      };
    } else {
      return res.status(400).json({ message: 'No file uploaded or details provided' });
    }

    lesson.documents.push(documentData);
    await lesson.save();

    res.json({ message: 'Learning material uploaded successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  uploadLearningMaterials
};
