import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
    getAllCoursesAdmin,
    getCourseAdmin,
    updateCourseAdmin,
    deleteCourseAdmin,
    updateCourseStatus,
} from "../controllers/adminCourseController.js";

const router = express.Router();

// All Courses
router.get(
    "/",
    authMiddleware,
    getAllCoursesAdmin
);

// Single Course
router.get(
    "/:id",
    authMiddleware,
    getCourseAdmin
);

// Update
router.put(
    "/:id",
    authMiddleware,
    updateCourseAdmin
);

// Delete
router.delete(
    "/:id",
    authMiddleware,
    deleteCourseAdmin
);

// Change Status
router.patch(
    "/:id/status",
    authMiddleware,
    updateCourseStatus
);

export default router;