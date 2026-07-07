const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  approveInstructor,
  rejectInstructor,
  getUserStats,
  updateProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/users/stats  — Admin only
router.get('/stats', authMiddleware, roleMiddleware('admin'), getUserStats);

// PUT /api/users/profile  — Any authenticated user
router.put('/profile', authMiddleware, updateProfile);

// PUT /api/users/:id/approve  — Admin only
router.put('/:id/approve', authMiddleware, roleMiddleware('admin'), approveInstructor);

// PUT /api/users/:id/reject  — Admin only
router.put('/:id/reject', authMiddleware, roleMiddleware('admin'), rejectInstructor);

// GET /api/users  — Admin only
router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);

// GET /api/users/:id  — Authenticated
router.get('/:id', authMiddleware, getUserById);

// PUT /api/users/:id  — Admin only
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateUser);

// DELETE /api/users/:id  — Admin only
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

module.exports = router;
