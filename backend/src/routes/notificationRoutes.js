const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');

// Define the endpoints for notification operations
router.get('/:userId?', getNotifications);
router.patch('/:notificationId/read', markAsRead);

module.exports = router;
