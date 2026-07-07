const ForumPost = require('../models/ForumPost');

// Start a new discussion topic
const createPost = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const authorId = req.user ? req.user.id : req.body.userId; // Fallback for dev

    if (!title || !content || !authorId) {
      return res.status(400).json({ message: 'We need a title, content, and an author to create a post!' });
    }

    const newPost = new ForumPost({
      title,
      content,
      author: authorId,
      course: courseId || null, // Optional
    });

    await newPost.save();

    res.status(201).json({
      message: 'Awesome, your forum post is live!',
      post: newPost,
    });
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).json({ message: 'Server hiccup while creating your post. Try again.' });
  }
};

// Get all posts (optionally filter by course)
const getPosts = async (req, res) => {
  try {
    const { courseId } = req.query; // e.g., /api/forums?courseId=123

    let query = {};
    if (courseId) {
      query.course = courseId;
    }

    // Fetch posts and populate the author's name so we don't just see IDs
    const posts = await ForumPost.find(query)
      .populate('author', 'name profilePicture')
      .populate('replies.author', 'name profilePicture')
      .sort({ createdAt: -1 }); // Newest first!

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).json({ message: 'Could not load the discussions right now.' });
  }
};

// Reply to an existing post
const addReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user ? req.user.id : req.body.userId;

    if (!content || !authorId) {
      return res.status(400).json({ message: 'Reply content and author are required.' });
    }

    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Are you sure? We can\'t find that post to reply to.' });
    }

    // Push the new reply into the array
    post.replies.push({
      author: authorId,
      content: content,
    });

    await post.save();

    res.status(201).json({
      message: 'Reply added successfully!',
      post, // Might be heavy to send the whole post back, but good for now
    });

  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Oops, couldn\'t post your reply.' });
  }
};

module.exports = {
  createPost,
  getPosts,
  addReply,
};
