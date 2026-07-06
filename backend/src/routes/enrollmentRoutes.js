const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses } = require('../controllers/enrollmentController');

// In a real app, you would add an authentication middleware here 
// like: router.post('/enroll', authMiddleware, enrollCourse);

router.post('/enroll', enrollCourse);
router.get('/my-courses/:userId?', getMyCourses);

module.exports = router;
