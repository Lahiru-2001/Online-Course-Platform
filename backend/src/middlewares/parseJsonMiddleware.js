export default function parseJsonMiddleware(req, res, next) {

    try {

        // Lessons
        if (req.body.lessons && typeof req.body.lessons === "string") {
            req.body.lessons = JSON.parse(req.body.lessons);
        }

        // Course Includes
        if (req.body.courseIncludes && typeof req.body.courseIncludes === "string") {
            req.body.courseIncludes = JSON.parse(req.body.courseIncludes);
        }

        // Pricing
        if (req.body.pricing && typeof req.body.pricing === "string") {
            req.body.pricing = JSON.parse(req.body.pricing);
        }

        // Certificate
        if (req.body.certificate && typeof req.body.certificate === "string") {
            req.body.certificate = JSON.parse(req.body.certificate);
        }

        next();

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Invalid JSON data.",
            error: error.message
        });

    }

}