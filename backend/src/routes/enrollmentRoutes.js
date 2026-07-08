import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
    enrollCourse,
    getMyCourses,
    getEnrollment,
    getCompletedCourse,
    updateProgress
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post(
    "/:courseId",
    authMiddleware,
    enrollCourse
);

router.get(
    "/my",
    authMiddleware,
    getMyCourses
);

router.get(
    "/course/:courseId",
    authMiddleware,
    getEnrollment
);

router.get(
    "/course/:courseId/completed",
    authMiddleware,
    getCompletedCourse
);

router.put(
    "/progress/:courseId",
    authMiddleware,
    updateProgress
);

export default router;