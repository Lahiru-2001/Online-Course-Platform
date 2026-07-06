const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/forumController');

// GET /api/forum
router.get('/', getPosts);

// POST /api/forum
router.post('/', createPost);

// GET /api/forum/:id
router.get('/:id', getPostById);

// PUT /api/forum/:id
router.put('/:id', updatePost);

// DELETE /api/forum/:id
router.delete('/:id', deletePost);

module.exports = router;
