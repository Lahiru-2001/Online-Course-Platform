const ForumPost = require('../models/ForumPost');

// Create a new forum discussion post
const createPost = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const authorId = req.user ? req.user.id : req.body.userId; 

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: 'Title, content, and author ID are required.' });
    }

    const newPost = new ForumPost({
      title,
      content,
      author: authorId,
      course: courseId || null,
    });

    await newPost.save();

    res.status(201).json({
      message: 'Forum post created successfully.',
      post: newPost,
    });
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).json({ message: 'An error occurred while creating the post.' });
  }
};

// Retrieve all forum posts, optionally filtered by course
const getPosts = async (req, res) => {
  try {
    const { courseId } = req.query;

    let query = {};
    if (courseId) {
      query.course = courseId;
    }

    // Populate author details for the post and its replies
    const posts = await ForumPost.find(query)
      .populate('author', 'name profilePicture')
      .populate('replies.author', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).json({ message: 'Failed to fetch forum discussions.' });
  }
};

// Add a reply to an existing forum post
const addReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user ? req.user.id : req.body.userId;

    if (!content || !authorId) {
      return res.status(400).json({ message: 'Reply content and author ID are required.' });
    }

    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Forum post not found.' });
    }

    post.replies.push({
      author: authorId,
      content: content,
    });

    await post.save();

    res.status(201).json({
      message: 'Reply added successfully.',
      post,
    });

  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'An error occurred while posting the reply.' });
  }
};

// Update an existing forum post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const authorId = req.user ? req.user.id : req.body.userId;

    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Forum post not found.' });
    }

    if (post.author.toString() !== authorId) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own posts.' });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.status(200).json({ message: 'Post updated successfully.', post });
  } catch (error) {
    console.error('Error updating forum post:', error);
    res.status(500).json({ message: 'Failed to update the post.' });
  }
};

// Delete a forum post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const authorId = req.user ? req.user.id : req.body.userId;

    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Forum post not found.' });
    }

    if (post.author.toString() !== authorId) {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own posts.' });
    }

    await ForumPost.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting forum post:', error);
    res.status(500).json({ message: 'Failed to delete the post.' });
  }
};

module.exports = {
  createPost,
  getPosts,
  addReply,
  addComment: addReply,
  updatePost,
  deletePost,
};
