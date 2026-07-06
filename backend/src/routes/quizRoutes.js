const express = require('express');
const router = express.Router();
const { startQuiz, submitQuiz } = require('../controllers/quizController');

router.get('/:quizId/start', startQuiz);
router.post('/:quizId/submit', submitQuiz);

module.exports = router;
