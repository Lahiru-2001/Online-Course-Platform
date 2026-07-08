import { body, validationResult } from "express-validator";


// Course Validation Rules
export const createCourseValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Course title is required.")
        .isLength({ min: 5, max: 150 })
        .withMessage("Course title must be between 5 and 150 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Course description is required.")
        .isLength({ min: 20 })
        .withMessage("Description must contain at least 20 characters."),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required."),

    body("difficulty")
        .isIn([
            "Beginner",
            "Intermediate",
            "Advanced",
        ])
        .withMessage("Invalid difficulty level."),

    body("duration")
        .trim()
        .notEmpty()
        .withMessage("Course duration is required."),

    body("offeredBy")
        .trim()
        .notEmpty()
        .withMessage("Offered By is required."),


    // Pricing

    body("pricing.isFree")
        .optional()
        .isBoolean()
        .withMessage("isFree must be true or false."),

    body("pricing.originalPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Original price must be greater than or equal to 0."),

    body("pricing.discountPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount price must be greater than or equal to 0."),

    // Course Includes

    body("courseIncludes")
        .optional()
        .custom((value) => {

            if (!Array.isArray(value)) {
                throw new Error("Course Includes must be an array.");
            }

            return true;

        }),


    // Lessons

    body("lessons")
        .custom((value) => {

            if (!Array.isArray(value)) {
                throw new Error("At least one lesson is required.");
            }

            if (value.length === 0) {
                throw new Error("At least one lesson is required.");
            }

            return true;

        }),

    body("lessons.*.title")
        .trim()
        .notEmpty()
        .withMessage("Each lesson must have a title."),

    body("lessons.*.lessonNumber")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Lesson number must be greater than 0."),

    body("lessons.*.quiz")
        .optional()
        .isArray(),

    body("lessons.*.quiz.*.question")
        .optional()
        .notEmpty()
        .withMessage("Quiz question cannot be empty."),

    body("lessons.*.quiz.*.options")
        .optional()
        .isArray({ min: 2 })
        .withMessage("Quiz must contain at least two options."),

    body("lessons.*.quiz.*.answer")
        .optional()
        .notEmpty()
        .withMessage("Quiz answer is required."),


    // Certificate

    body("certificate.enabled")
        .optional()
        .isBoolean()
        .withMessage("Certificate enabled must be boolean."),

    body("certificate.type")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Certificate type is required."),

    body("certificate.template")
        .optional()
        .trim()

];


// Validation Middleware

export const validateCourse = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,
            message: "Validation Failed",
            errors: errors.array(),

        });

    }

    next();

};