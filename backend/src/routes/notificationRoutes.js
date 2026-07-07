const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/notifications - Authenticated users
router.get('/', authMiddleware, getNotifications);

// PUT /api/notifications/:id/read - Authenticated users
router.put('/:id/read', authMiddleware, markAsRead);

// DELETE /api/notifications/:id - Authenticated users
router.delete('/:id', authMiddleware, deleteNotification);

module.exports = router;
