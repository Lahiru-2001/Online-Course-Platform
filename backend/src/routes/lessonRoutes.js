const express = require('express');
const router = express.Router();
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

// GET /api/lessons
router.get('/', getLessons);

// GET /api/lessons/:id
router.get('/:id', getLessonById);

// POST /api/lessons
router.post('/', createLesson);

// PUT /api/lessons/:id
router.put('/:id', updateLesson);

// DELETE /api/lessons/:id
router.delete('/:id', deleteLesson);

module.exports = router;
