const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizController');

// GET /api/quizzes
router.get('/', getQuizzes);

// GET /api/quizzes/:id
router.get('/:id', getQuizById);

// POST /api/quizzes
router.post('/', createQuiz);

// PUT /api/quizzes/:id
router.put('/:id', updateQuiz);

// DELETE /api/quizzes/:id
router.delete('/:id', deleteQuiz);

module.exports = router;
