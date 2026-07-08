import Course from "../models/Course.js";


// Get All Courses (Admin)
export const getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: courses.length,
            courses,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch courses.",
        });
    }
};


// Get Course By ID
export const getCourseAdmin = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "fullName email");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        res.json({
            success: true,
            course,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// Update Course
export const updateCourseAdmin = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });

        }

        Object.assign(course, req.body);

        await course.save();

        res.json({
            success: true,
            message: "Course updated successfully.",
            course,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Delete Course
export const deleteCourseAdmin = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });

        }

        await course.deleteOne();

        res.json({
            success: true,
            message: "Course deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Update Status
export const updateCourseStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });

        }

        course.status = status;

        await course.save();

        res.json({
            success: true,
            message: "Status updated successfully.",
            course,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};