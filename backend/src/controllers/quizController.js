const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');
// const Enrollment = require('../models/Enrollment'); // TODO: Check if user is enrolled before starting quiz!

// Let the student start the quiz by fetching the questions
const startQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    // Dig up the quiz from the database
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Uh oh, quiz not found. Are you sure it exists?' });
    }

    // IMPORTANT: Strip out the correct answers before sending it to the frontend!
    // Otherwise, clever students can just inspect the network tab and cheat.
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
    console.error('Whoops, error starting quiz:', error);
    res.status(500).json({ message: 'Failed to load the quiz up.' });
  }
};

// Handle the quiz submission, calculate the final score, and save it
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // We expect an array like: [{ questionId, selectedOption }]
    
    // Auth check fallback
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Need your user ID and a valid array of answers to grade this.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Can\'t grade a quiz that doesn\'t exist!' });
    }

    // Let's grade this bad boy
    let finalScore = 0;
    const processedAnswers = [];

    answers.forEach((userAnswer) => {
      // Find the corresponding question in the DB
      const question = quiz.questions.find((q) => q._id.toString() === userAnswer.questionId);
      
      if (question) {
        // Is it right?
        const isCorrect = (question.correctAnswer === userAnswer.selectedOption);
        if (isCorrect) {
          finalScore += 1;
        }

        // Keep track of what they picked for the submission record
        processedAnswers.push({
          questionId: question._id,
          selectedOption: userAnswer.selectedOption,
          isCorrect: isCorrect,
        });
      }
    });

    // Save the results to DB
    const submission = new QuizSubmission({
      quiz: quizId,
      user: userId,
      score: finalScore,
      answers: processedAnswers,
    });

    await submission.save();

    // Send back the score so they know how they did
    res.status(201).json({
      message: 'Quiz graded and submitted successfully!',
      score: finalScore,
      totalQuestions: quiz.questions.length,
      submissionId: submission._id,
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Something went terribly wrong grading the quiz.' });
  }
};

module.exports = {
  startQuiz,
  submitQuiz,
};
