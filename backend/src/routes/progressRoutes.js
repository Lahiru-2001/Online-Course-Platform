const express = require('express');
const router = express.Router();
const {
  updateProgress,
  getProgress
} = require('../controllers/progressController');

// PUT /api/progress/update
router.put('/update', updateProgress);

// GET /api/progress/:courseId
router.get('/:courseId', getProgress);

module.exports = router;
