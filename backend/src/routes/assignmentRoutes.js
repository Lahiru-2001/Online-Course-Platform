const express = require('express');
const router = express.Router();
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');

// GET /api/assignments
router.get('/', getAssignments);

// GET /api/assignments/:id
router.get('/:id', getAssignmentById);

// POST /api/assignments
router.post('/', createAssignment);

// PUT /api/assignments/:id
router.put('/:id', updateAssignment);

// DELETE /api/assignments/:id
router.delete('/:id', deleteAssignment);

module.exports = router;
