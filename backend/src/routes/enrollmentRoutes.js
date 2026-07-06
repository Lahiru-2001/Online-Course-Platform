const express = require('express');
const router = express.Router();
const {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');

// GET /api/enrollments
router.get('/', getEnrollments);

// GET /api/enrollments/:id
router.get('/:id', getEnrollmentById);

// POST /api/enrollments
router.post('/', createEnrollment);

// PUT /api/enrollments/:id
router.put('/:id', updateEnrollment);

// DELETE /api/enrollments/:id
router.delete('/:id', deleteEnrollment);

module.exports = router;
