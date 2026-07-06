const express = require('express');
const router = express.Router();
const {
  getMessages,
  sendMessage
} = require('../controllers/chatController');

// GET /api/chat/:userId
router.get('/:userId', getMessages);

// POST /api/chat/send
router.post('/send', sendMessage);

module.exports = router;
