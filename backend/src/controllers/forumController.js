// Forum Controller

const getPosts = async (req, res) => res.json({ message: 'Get all forum posts' });
const createPost = async (req, res) => res.json({ message: 'Create forum post' });
const getPostById = async (req, res) => res.json({ message: 'Get forum post by ID' });
const updatePost = async (req, res) => res.json({ message: 'Update forum post' });
const deletePost = async (req, res) => res.json({ message: 'Delete forum post' });

module.exports = {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost
};
