const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security & Logging Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    message: 'Too many requests, try again later'
  }
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'LMS API Server is running...' });
});

// Error Handler Middleware (if exists)
try {
  const errorHandler = require('./middlewares/errorHandler');
  app.use(errorHandler);
} catch (e) {
  // If errorHandler module is not there yet, fallback gracefully or log it
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });
}

module.exports = app;
