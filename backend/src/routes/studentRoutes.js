import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import {
    getStudentProfile,
    updateStudentProfile,
    getStudentDashboard,
} from "../controllers/studentController.js";

const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    getStudentProfile
);

router.put(
    "/profile",
    authMiddleware,
    upload.single("profileImage"),
    updateStudentProfile
);

router.get(
    "/dashboard",
    authMiddleware,
    getStudentDashboard
);

export default router;