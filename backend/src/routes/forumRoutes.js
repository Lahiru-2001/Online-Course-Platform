const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/forumController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/forum - Authenticated users
router.get('/', authMiddleware, getPosts);

// POST /api/forum - Authenticated users
router.post('/', authMiddleware, createPost);

// GET /api/forum/:id - Authenticated users
router.get('/:id', authMiddleware, getPostById);

// PUT /api/forum/:id - Authenticated users (creator)
router.put('/:id', authMiddleware, updatePost);

// DELETE /api/forum/:id - Authenticated users (creator & admin)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
