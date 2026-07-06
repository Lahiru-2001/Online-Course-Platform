const express = require('express');
const router = express.Router();
const { createPost, getPosts, addReply } = require('../controllers/forumController');

// Define the endpoints for forum operations
router.post('/', createPost);
router.get('/', getPosts);
router.post('/:postId/reply', addReply);

module.exports = router;
