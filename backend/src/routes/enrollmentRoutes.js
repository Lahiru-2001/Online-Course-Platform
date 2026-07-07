const express = require('express');
const router = express.Router();
const {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/enrollments  — Admin or Instructor
router.get('/', authMiddleware, roleMiddleware('admin', 'instructor'), getEnrollments);

// GET /api/enrollments/:id  — Authenticated
router.get('/:id', authMiddleware, getEnrollmentById);

// POST /api/enrollments  — Student only
router.post('/', authMiddleware, roleMiddleware('student'), createEnrollment);

// PUT /api/enrollments/:id  — Authenticated
router.put('/:id', authMiddleware, updateEnrollment);

// DELETE /api/enrollments/:id  — Admin only
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteEnrollment);

module.exports = router;
