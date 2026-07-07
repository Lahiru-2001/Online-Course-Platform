const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');

// Define the endpoints for chat operations
router.post('/send', sendMessage);
router.get('/', getMessages);

module.exports = router;
