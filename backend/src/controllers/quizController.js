const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');
// const Enrollment = require('../models/Enrollment'); // TODO: Check if user is enrolled before allowing quiz access

// Fetch all quizzes for a specific course
const getCourseQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required.' });
    }

    // Exclude the correct answers to prevent exposing them to the client
    const quizzes = await Quiz.find({ course: courseId }).select('-questions.correctAnswer');
    
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching course quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes for this course.' });
  }
};

// Initialize quiz session by fetching questions
const startQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    // Strip out the correct answers before sending the data to the client
    const safeQuizData = {
      _id: quiz._id,
      title: quiz.title,
      course: quiz.course,
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options,
      })),
    };

    res.status(200).json(safeQuizData);
  } catch (error) {
    console.error('Error initializing quiz:', error);
    res.status(500).json({ message: 'Failed to load quiz data.' });
  }
};

// Process quiz submission and calculate the final score
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Expected format: [{ questionId, selectedOption }]
    
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'User ID and a valid answers array are required.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    let finalScore = 0;
    const processedAnswers = [];

    // Grade each submitted answer
    answers.forEach((userAnswer) => {
      const question = quiz.questions.find((q) => q._id.toString() === userAnswer.questionId);
      
      if (question) {
        const isCorrect = (question.correctAnswer === userAnswer.selectedOption);
        if (isCorrect) {
          finalScore += 1;
        }

        processedAnswers.push({
          questionId: question._id,
          selectedOption: userAnswer.selectedOption,
          isCorrect: isCorrect,
        });
      }
    });

    // Save the submission results
    const submission = new QuizSubmission({
      quiz: quizId,
      user: userId,
      score: finalScore,
      answers: processedAnswers,
    });

    await submission.save();

    res.status(201).json({
      message: 'Quiz submitted successfully.',
      score: finalScore,
      totalQuestions: quiz.questions.length,
      submissionId: submission._id,
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'An error occurred while grading the quiz.' });
  }
};

module.exports = {
  getCourseQuizzes,
  startQuiz,
  submitQuiz,
};
