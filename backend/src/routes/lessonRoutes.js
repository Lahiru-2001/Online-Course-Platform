const express = require('express');
const router = express.Router();
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  uploadLearningMaterials,
} = require('../controllers/lessonController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/lessons  — Authenticated
router.get('/', authMiddleware, getLessons);

// GET /api/lessons/:id  — Authenticated
router.get('/:id', authMiddleware, getLessonById);

// POST /api/lessons  — Instructor only
router.post('/', authMiddleware, roleMiddleware('instructor'), createLesson);

// PUT /api/lessons/:id  — Instructor only
router.put('/:id', authMiddleware, roleMiddleware('instructor'), updateLesson);

// DELETE /api/lessons/:id  — Instructor or Admin
router.delete('/:id', authMiddleware, roleMiddleware('instructor', 'admin'), deleteLesson);

// POST /api/lessons/:id/upload  — Instructor only
router.post('/:id/upload', authMiddleware, roleMiddleware('instructor'), uploadLearningMaterials);

module.exports = router;
