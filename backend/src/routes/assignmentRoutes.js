const express = require('express');
const router = express.Router();
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/assignments - Authenticated users
router.get('/', authMiddleware, getAssignments);

// GET /api/assignments/:id - Authenticated users
router.get('/:id', authMiddleware, getAssignmentById);

// POST /api/assignments - Instructor only
router.post('/', authMiddleware, roleMiddleware('instructor'), createAssignment);

// PUT /api/assignments/:id - Instructor only
router.put('/:id', authMiddleware, roleMiddleware('instructor'), updateAssignment);

// DELETE /api/assignments/:id - Instructor & Admin
router.delete('/:id', authMiddleware, roleMiddleware('instructor', 'admin'), deleteAssignment);

module.exports = router;
