const { body, validationResult } = require("express-validator");



// CHECK VALIDATION ERRORS

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};



// AUTH VALIDATION


// Register

const validateRegister = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),


    body("email")
        .isEmail()
        .withMessage("Valid email is required"),


    body("password")
        .isLength({ min: 6 })
        .withMessage(
            "Password must be minimum 6 characters"
        )

];



// Login

const validateLogin = [

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),


    body("password")
        .notEmpty()
        .withMessage("Password is required")

];




 
// COURSE VALIDATION
 

const validateCourse = [

    body("title")
        .notEmpty()
        .withMessage("Course title required"),


    body("description")
        .notEmpty()
        .withMessage("Course description required"),


    body("category")
        .notEmpty()
        .withMessage("Course category required")

];




// LESSON VALIDATION

const validateLesson = [

    body("title")
        .notEmpty()
        .withMessage("Lesson title required"),


    body("content")
        .notEmpty()
        .withMessage("Lesson content required")

];




// QUIZ VALIDATION

const validateQuiz = [

    body("question")
        .notEmpty()
        .withMessage("Question required"),


    body("options")
        .notEmpty()
        .withMessage("Options required"),


    body("answer")
        .notEmpty()
        .withMessage("Answer required")

];




// ASSIGNMENT VALIDATION


const validateAssignment = [

    body("title")
        .notEmpty()
        .withMessage("Assignment title required"),


    body("deadline")
        .notEmpty()
        .withMessage("Deadline required")

];




// ENROLLMENT VALIDATION

const validateEnrollment = [

    body("courseId")
        .notEmpty()
        .withMessage("Course ID required")

];




// PAYMENT VALIDATION

const validatePayment = [

    body("amount")
        .notEmpty()
        .withMessage("Payment amount required"),


    body("courseId")
        .notEmpty()
        .withMessage("Course ID required")

];




// CERTIFICATE VALIDATION

const validateCertificate = [

    body("userId")
        .notEmpty()
        .withMessage("User ID required"),


    body("courseId")
        .notEmpty()
        .withMessage("Course ID required")

];




// PROGRESS VALIDATION

const validateProgress = [

    body("courseId")
        .notEmpty()
        .withMessage("Course ID required"),


    body("progress")
        .notEmpty()
        .withMessage("Progress required")

];




// FORUM VALIDATION

const validateForum = [

    body("title")
        .notEmpty()
        .withMessage("Forum title required"),


    body("description")
        .notEmpty()
        .withMessage("Forum description required")

];




// CHAT VALIDATION

const validateMessage = [

    body("receiverId")
        .notEmpty()
        .withMessage("Receiver ID required"),


    body("message")
        .notEmpty()
        .withMessage("Message required")

];



module.exports = {


    // Common validator

    validate,
    validateRegister,
    validateLogin,
    validateCourse,
    validateLesson,
    validateQuiz,
    validateAssignment,
    validateEnrollment,
    validatePayment,
    validateCertificate,
    validateProgress,
    validateForum,
    validateMessage

};