const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/quizzes - Authenticated users
router.get('/', authMiddleware, getQuizzes);

// GET /api/quizzes/:id - Authenticated users
router.get('/:id', authMiddleware, getQuizById);

// POST /api/quizzes - Instructor only
router.post('/', authMiddleware, roleMiddleware('instructor'), createQuiz);

// PUT /api/quizzes/:id - Instructor only
router.put('/:id', authMiddleware, roleMiddleware('instructor'), updateQuiz);

// DELETE /api/quizzes/:id - Instructor & Admin
router.delete('/:id', authMiddleware, roleMiddleware('instructor', 'admin'), deleteQuiz);

module.exports = router;
