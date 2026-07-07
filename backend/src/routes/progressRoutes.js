const express = require('express');
const router = express.Router();
const { updateProgress, getProgress } = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// PUT /api/progress/update  — Student only
router.put('/update', authMiddleware, roleMiddleware('student'), updateProgress);

// GET /api/progress/:courseId  — Student only
router.get('/:courseId', authMiddleware, roleMiddleware('student'), getProgress);

module.exports = router;
