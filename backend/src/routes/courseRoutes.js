import express from "express";

import {
    createCourse,
    getAllCourses,
    getCourseById,
    addCourseRating,
    getCourseRatings,
    getInstructorCourses,
    updateCourse,
    deleteCourse,
} from "../controllers/courseController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import parseJsonMiddleware from "../middlewares/parseJsonMiddleware.js";

import {
    createCourseValidation,
    validateCourse,
} from "../validations/courseValidation.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get(
    "/instructor/my",
    authMiddleware,
    getInstructorCourses
);


router.get("/:id", getCourseById);

router.get("/:id/ratings", getCourseRatings);

// Add or update rating
router.post(
    "/:id/rating",
    authMiddleware,
    addCourseRating
);

router.put(
    "/:id",
    authMiddleware,
    upload.any(),
    parseJsonMiddleware,
    updateCourse
);

router.delete(
    "/:id",
    authMiddleware,
    deleteCourse
);

router.post(
    "/",
    authMiddleware,
    upload.any(),
    parseJsonMiddleware,
    createCourseValidation,
    validateCourse,
    createCourse
);

export default router;