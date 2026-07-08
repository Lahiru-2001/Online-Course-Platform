import Course from "../models/Course.js";
import path from "path";

export const createCourse = async (req, res) => {

    try {
        const instructor = req.user._id;

        let {
            title,
            description,
            category,
            difficulty,
            duration,
            offeredBy,
            courseIncludes,
            pricing,
            lessons,
            certificate,
        } = req.body;

        try {

            if (typeof lessons === "string") {
                lessons = JSON.parse(lessons);
            }

            if (typeof pricing === "string") {
                pricing = JSON.parse(pricing);
            }

            if (typeof courseIncludes === "string") {
                courseIncludes = JSON.parse(courseIncludes);
            }

            if (typeof certificate === "string") {
                certificate = JSON.parse(certificate);
            }

        } catch (err) {

            return res.status(400).json({
                success: false,
                message: "Invalid JSON data.",
                error: err.message,
            });

        }

        // Required fields
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Course title is required.",
            });
        }

        if (!description || description.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Course description is required.",
            });
        }

        if (!category || category.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Course category is required.",
            });
        }

        if (!difficulty) {
            return res.status(400).json({
                success: false,
                message: "Difficulty level is required.",
            });
        }

        if (!duration || duration.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Course duration is required.",
            });
        }

        if (!offeredBy || offeredBy.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Offered By is required.",
            });
        }

        // Validate lessons
        if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one lesson is required.",
            });
        }

        // Validate lesson titles
        for (const lesson of lessons) {

            if (!lesson.title || lesson.title.trim() === "") {

                return res.status(400).json({
                    success: false,
                    message: "Every lesson must have a title.",
                });

            }

        }

        // Validate pricing
        if (
            pricing &&
            !pricing.isFree &&
            Number(pricing.originalPrice) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Original price cannot be negative.",
            });
        }

        if (
            pricing &&
            Number(pricing.discountPrice) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Discount price cannot be negative.",
            });
        }


        // Check Duplicate Course
        const existingCourse = await Course.findOne({

            instructor: instructor,
            title: title.trim(),

        });

        if (existingCourse) {

            return res.status(400).json({
                success: false,
                message: "You already have a course with this title.",

            });

        }


        // Generate Course Slug

        const slug =
            title
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")   // Remove special characters
                .replace(/\s+/g, "-")       // Replace spaces with -
                .replace(/-+/g, "-")        // Remove duplicate hyphens
            +
            "-" +
            Date.now();

        // All uploaded files
        const uploadedFiles = req.files || [];

        let courseImage = "";

        const thumbnail = uploadedFiles.find(
            (file) => file.fieldname === "courseImage"
        );

        if (thumbnail) {
            courseImage = `/uploads/images/${thumbnail.filename}`;
        }

        const certificateFiles = {

            logo: "",

            signature: "",

            background: ""

        };

        const certificateLogo = uploadedFiles.find(
            (file) => file.fieldname === "certificateLogo"
        );

        if (certificateLogo) {
            certificateFiles.logo =
                `/uploads/images/${certificateLogo.filename}`;
        }

        const certificateSignature = uploadedFiles.find(
            (file) => file.fieldname === "certificateSignature"
        );

        if (certificateSignature) {
            certificateFiles.signature =
                `/uploads/images/${certificateSignature.filename}`;
        }

        const certificateBackground = uploadedFiles.find(
            (file) => file.fieldname === "certificateBackground"
        );

        if (certificateBackground) {
            certificateFiles.background =
                `/uploads/images/${certificateBackground.filename}`;
        }

        // Lesson Videos
        const lessonVideos = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("lessonVideo")) {

                lessonVideos[file.fieldname] = {

                    title: file.originalname,
                    fileUrl: `/uploads/videos/${file.filename}`,
                    size: file.size,

                };

            }

        });

        // Lesson Documents
        const lessonDocuments = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("lessonDocument")) {

                if (!lessonDocuments[file.fieldname]) {

                    lessonDocuments[file.fieldname] = [];

                }

                lessonDocuments[file.fieldname].push({

                    fileName: file.originalname,
                    fileUrl: `/uploads/files/${file.filename}`,
                    fileType: path.extname(file.originalname),
                    fileSize: file.size,

                });

            }

        });

        // Assignment Files

        const assignmentFiles = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("assignmentFile")) {

                assignmentFiles[file.fieldname] = {

                    fileName: file.originalname,
                    fileUrl: `/uploads/files/${file.filename}`,
                    fileSize: file.size,

                };

            }

        });

        // Parse JSON Data
        const parsedLessons = lessons;
        const parsedPricing = pricing;
        const parsedCourseIncludes = courseIncludes;
        const parsedCertificate = certificate;

        // Build Lessons
        const courseLessons = parsedLessons.map((lesson, index) => {

            const videoKey = `lessonVideo${index}`;
            const documentKey = `lessonDocument${index}`;
            const assignmentKey = `assignmentFile${index}`;

            return {

                lessonNumber: index + 1,

                title: lesson.title,

                video: lessonVideos[videoKey]
                    ? {
                        title: lessonVideos[videoKey].title,
                        fileUrl: lessonVideos[videoKey].fileUrl,
                        size: lessonVideos[videoKey].size,
                        duration: 0,
                        thumbnail: "",
                    }
                    : {},

                documents:
                    lessonDocuments[documentKey] || [],

                quiz: lesson.quiz || [],

                assignment: {

                    title:
                        lesson.assignment?.title || "",
                    description:
                        lesson.assignment?.description || "",
                    marks:
                        lesson.assignment?.marks || 100,
                    dueDate:
                        lesson.assignment?.dueDate || null,
                    file:
                        assignmentFiles[assignmentKey] || {},

                },

            };

        });

        // Build Certificate
        const courseCertificate = {

            enabled: parsedCertificate?.enabled ?? true,
            type: parsedCertificate?.type || "Completion",
            template: parsedCertificate?.template || "University",
            logo: certificateFiles.logo,
            signature: certificateFiles.signature,
            background: certificateFiles.background,

        };



        // Calculate Course Statistics
        // Total Lessons
        const totalLessons = courseLessons.length;

        // Total Videos
        const totalVideos = courseLessons.filter(
            (lesson) => lesson.video && lesson.video.fileUrl
        ).length;

        // Total Documents
        const totalDocuments = courseLessons.reduce(
            (total, lesson) => total + lesson.documents.length,
            0
        );

        // Total Quizzes
        const totalQuizzes = courseLessons.reduce(
            (total, lesson) => total + lesson.quiz.length,
            0
        );

        // Total Assignments
        const totalAssignments = courseLessons.filter(
            (lesson) =>
                lesson.assignment &&
                lesson.assignment.title &&
                lesson.assignment.title.trim() !== ""
        ).length;

        // Total Video Duration
        const totalDuration = courseLessons.reduce(
            (total, lesson) =>
                total + (lesson.video?.duration || 0),
            0
        );

        // Create Course Object
        const course = new Course({

            // Course Owner
            instructor,
            // Basic Information
            title: title.trim(),
            slug,
            description: description.trim(),
            image: courseImage,
            category: category.trim(),
            difficulty,
            duration: duration.trim(),
            offeredBy: offeredBy.trim(),
            language: "English",
            // Course Includes
            courseIncludes: parsedCourseIncludes || [],

            // Pricing
            pricing: {
                isFree: parsedPricing?.isFree || false,
                originalPrice: parsedPricing?.originalPrice || 0,
                discountPrice: parsedPricing?.discountPrice || 0,
                currency: parsedPricing?.currency || "LKR",

            },

            // Lessons
            lessons: courseLessons,
            // Certificate
            certificate: courseCertificate,
            // Statistics
            totalLessons,
            totalVideos,
            totalDocuments,
            totalQuizzes,
            totalAssignments,
            totalDuration,
            // Default Values
            enrolledStudents: 0,
            averageRating: 0,
            totalRatings: 0,
            ratingBreakdown: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },

            reviews: [],
            status: "Published",

        });

        // Save Course
        await course.save();
        // Return Success
        return res.status(201).json({
            success: true,
            message: "Course created successfully.",
            course,

        });

    } catch (error) {

        console.error("Create Course Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,

        });

    }

};


// Get All Published Courses
export const getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find({
            status: "Published"
        })
            .populate("instructor", "fullName")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: courses.length,
            courses
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch courses."
        });

    }
};


// Get Logged-in Instructor Courses
export const getInstructorCourses = async (req, res) => {
    try {

        const instructorId = req.user._id;

        const courses = await Course.find({
            instructor: instructorId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: courses.length,
            courses
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch instructor courses."
        });

    }
};


// Update Course
export const updateCourse = async (req, res) => {

    try {

        const instructorId = req.user._id;
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        if (course.instructor.toString() !== instructorId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can edit only your own courses."
            });
        }

        let {
            title,
            description,
            category,
            difficulty,
            duration,
            offeredBy,
            language,
            status,
            pricing,
            courseIncludes,
            lessons,
            certificate,
        } = req.body;

        try {

            if (typeof pricing === "string") {
                pricing = JSON.parse(pricing);
            }

            if (typeof courseIncludes === "string") {
                courseIncludes = JSON.parse(courseIncludes);
            }

            if (typeof lessons === "string") {
                lessons = JSON.parse(lessons);
            }

            if (typeof certificate === "string") {
                certificate = JSON.parse(certificate);
            }

        } catch (err) {

            return res.status(400).json({
                success: false,
                message: "Invalid JSON data.",
                error: err.message,
            });

        }

        // Uploaded Files
        const uploadedFiles = req.files || [];
        // Course Thumbnail
        const thumbnail = uploadedFiles.find(
            (file) => file.fieldname === "courseImage"
        );

        if (thumbnail) {

            course.image = `/uploads/images/${thumbnail.filename}`;

        }

        // Certificate Images
        const certificateLogo = uploadedFiles.find(
            (file) => file.fieldname === "certificateLogo"
        );

        if (certificateLogo) {

            course.certificate.logo =
                `/uploads/images/${certificateLogo.filename}`;

        }

        const certificateSignature = uploadedFiles.find(
            (file) => file.fieldname === "certificateSignature"
        );

        if (certificateSignature) {

            course.certificate.signature =
                `/uploads/images/${certificateSignature.filename}`;

        }

        const certificateBackground = uploadedFiles.find(
            (file) => file.fieldname === "certificateBackground"
        );

        if (certificateBackground) {

            course.certificate.background =
                `/uploads/images/${certificateBackground.filename}`;

        }
        if (title !== undefined)
            course.title = title;

        if (description !== undefined)
            course.description = description;

        if (category !== undefined)
            course.category = category;

        if (difficulty !== undefined)
            course.difficulty = difficulty;

        if (duration !== undefined)
            course.duration = duration;

        if (offeredBy !== undefined)
            course.offeredBy = offeredBy;

        if (language !== undefined)
            course.language = language;

        if (status !== undefined)
            course.status = status;

        if (courseIncludes)
            course.courseIncludes = courseIncludes;

        if (pricing)
            course.pricing = pricing;

        if (certificate) {
            course.certificate.enabled = certificate.enabled;
            course.certificate.type = certificate.type;
            course.certificate.template = certificate.template;
        }

        const lessonVideos = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("lessonVideo")) {

                lessonVideos[file.fieldname] = {
                    title: file.originalname,
                    fileUrl: `/uploads/videos/${file.filename}`,
                    size: file.size,
                    duration: 0,
                    thumbnail: "",
                };

            }

        });

        const lessonDocuments = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("lessonDocument")) {

                if (!lessonDocuments[file.fieldname]) {
                    lessonDocuments[file.fieldname] = [];
                }

                lessonDocuments[file.fieldname].push({
                    fileName: file.originalname,
                    fileUrl: `/uploads/files/${file.filename}`,
                    fileType: path.extname(file.originalname),
                    fileSize: file.size,
                });

            }

        });

        const assignmentFiles = {};

        uploadedFiles.forEach((file) => {

            if (file.fieldname.startsWith("assignmentFile")) {

                assignmentFiles[file.fieldname] = {
                    fileName: file.originalname,
                    fileUrl: `/uploads/files/${file.filename}`,
                    fileSize: file.size,
                };

            }

        });

        if (lessons && Array.isArray(lessons)) {

            course.lessons = lessons.map((lesson, index) => {

                const oldLesson = course.lessons[index] || {};

                const videoKey = `lessonVideo${index}`;
                const documentKey = `lessonDocument${index}`;
                const assignmentKey = `assignmentFile${index}`;

                return {

                    lessonNumber: index + 1,

                    title: lesson.title,

                    video:
                        lessonVideos[videoKey]
                            ? lessonVideos[videoKey]
                            : (oldLesson.video || {}),

                    documents:
                        lessonDocuments[documentKey]
                            ? lessonDocuments[documentKey]
                            : (oldLesson.documents || []),

                    quiz: lesson.quiz || [],

                    assignment: {

                        title: lesson.assignment?.title || "",
                        description: lesson.assignment?.description || "",
                        marks: lesson.assignment?.marks || 100,
                        dueDate: lesson.assignment?.dueDate || "",

                        file:
                            assignmentFiles[assignmentKey]
                                ? assignmentFiles[assignmentKey]
                                : (oldLesson.assignment?.file || {})

                    }

                };

            });

        }


        course.totalLessons = course.lessons.length;

        course.totalVideos = course.lessons.filter(
            (lesson) => lesson.video && lesson.video.fileUrl
        ).length;

        course.totalDocuments = course.lessons.reduce(
            (total, lesson) => total + (lesson.documents?.length || 0),
            0
        );

        course.totalQuizzes = course.lessons.reduce(
            (total, lesson) => total + (lesson.quiz?.length || 0),
            0
        );

        course.totalAssignments = course.lessons.filter(
            (lesson) =>
                lesson.assignment &&
                lesson.assignment.title &&
                lesson.assignment.title.trim() !== ""
        ).length;

        course.totalDuration = course.lessons.reduce(
            (total, lesson) => total + (lesson.video?.duration || 0),
            0
        );

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully.",
            course
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Course
export const deleteCourse = async (req, res) => {

    try {

        const instructorId = req.user._id;
        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found."
            });

        }

        if (course.instructor.toString() !== instructorId.toString()) {

            return res.status(403).json({
                success: false,
                message: "You can delete only your own courses."
            });

        }

        await course.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully."

        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message

        });

    }

};

// Get Single Course
export const getCourseById = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)
            .populate("instructor", "fullName email");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch course."
        });

    }

};

export const addCourseRating = async (req, res) => {
    try {

        const { id } = req.params;
        const { rating, comment } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5.",
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }
        console.log("req.user =", req.user);
        console.log("course.reviews =", course.reviews);

        const existingReview = course.reviews.find(
            (review) =>
                review.student &&
                req.user &&
                req.user._id &&
                review.student.toString() === req.user._id.toString()
        );

        if (existingReview) {

            existingReview.rating = Number(rating);
            existingReview.comment = comment || "";

        } else {

            course.reviews.push({
                student: req.user._id,
                studentName: req.user.fullName,
                rating: Number(rating),
                comment: comment || "",
            });

        }

        course.updateRatings();

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Rating saved successfully.",
            averageRating: course.averageRating,
            totalRatings: course.totalRatings,
            ratingBreakdown: course.ratingBreakdown,
            reviews: course.reviews,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to save rating.",
        });

    }
};

export const getCourseRatings = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)
            .select("averageRating totalRatings ratingBreakdown reviews");

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });

        }

        return res.status(200).json({
            success: true,
            averageRating: course.averageRating,
            totalRatings: course.totalRatings,
            ratingBreakdown: course.ratingBreakdown,
            reviews: course.reviews.sort(
                (a, b) => b.createdAt - a.createdAt
            ),
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to load ratings.",
        });

    }

};