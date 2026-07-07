const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage
} = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/chat/:userId - Authenticated users
router.get('/:userId', authMiddleware, getMessages);

// POST /api/chat/send - Authenticated users
router.post('/send', authMiddleware, sendMessage);

module.exports = router;
