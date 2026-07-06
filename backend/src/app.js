const express = require('express');
const cors = require('cors');

// Set up the main Express app
const app = express();

// Add some basic security/parsing middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Let us parse JSON bodies in requests

// Just a simple route to verify the API is alive
app.get('/', (req, res) => {
  res.send('API is up and running smoothly!');
});

// Register all our API routes below
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/forums', require('./routes/forumRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));

// Export the app so server.js can start it
module.exports = app;
