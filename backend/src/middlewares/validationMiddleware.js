const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  next();
};

//
// ================= COURSE =================
//
const validateCourse = (req, res, next) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({
      message: "Title, description and category are required",
    });
  }

  next();
};

//
// ================= LESSON =================
//
const validateLesson = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Lesson title and content are required",
    });
  }

  next();
};

//
// ================= QUIZ =================
//
const validateQuiz = (req, res, next) => {
  const { question, options, answer } = req.body;

  if (!question || !options || !answer) {
    return res.status(400).json({
      message: "Question, options and answer are required",
    });
  }

  next();
};

//
// ================= ASSIGNMENT =================
//
const validateAssignment = (req, res, next) => {
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({
      message: "Title and deadline are required",
    });
  }

  next();
};

//
// ================= ENROLLMENT =================
//
const validateEnrollment = (req, res, next) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({
      message: "Course ID is required",
    });
  }

  next();
};



// PAYMENT VALIDATION
const validatePayment = (req, res, next) => {
  const { amount, courseId } = req.body;

  if (!amount || !courseId) {
    return res.status(400).json({
      message: "Amount and Course ID are required",
    });
  }

  next();
};

// CERTIFICATE VALIDATION
const validateCertificate = (req, res, next) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({
      message: "User ID and Course ID are required",
    });
  }

  next();
};

// PROGRESS VALIDATION
const validateProgress = (req, res, next) => {
  const { courseId, progress } = req.body;

  if (!courseId || progress == null) {
    return res.status(400).json({
      message: "Course ID and progress are required",
    });
  }

  next();
};

// FORUM VALIDATION
const validateForum = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  next();
};

// CHAT / MESSAGE VALIDATION
const validateMessage = (req, res, next) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({
      message: "Sender, receiver and message are required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCourse,
  validateLesson,
  validateQuiz,
  validateAssignment,
  validateEnrollment,

  // Sprint 3
  validatePayment,
  validateCertificate,
  validateProgress,
  validateForum,
  validateMessage,
};