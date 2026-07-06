const express = require('express');
const router = express.Router();
const { submitAssignment } = require('../controllers/assignmentController');

router.post('/:assignmentId/submit', submitAssignment);

module.exports = router;
