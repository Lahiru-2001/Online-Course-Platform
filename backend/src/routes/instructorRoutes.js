import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import {
    getInstructorEarnings,
    createWithdrawal,
    getWithdrawalHistory,
    getInstructorProfile,
    updateInstructorProfile,
} from "../controllers/instructorController.js";

// NEW IMPORT
import {
    getInstructorDashboard,
} from "../controllers/instructorDashboardController.js";

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    getInstructorDashboard
);

router.get(
    "/profile",
    authMiddleware,
    getInstructorProfile
);

// Update Instructor Profile
router.put(
    "/profile",
    authMiddleware,
    upload.single("profileImage"),
    updateInstructorProfile
);

router.get(
    "/earnings",
    authMiddleware,
    getInstructorEarnings
);

router.post(
    "/withdraw",
    authMiddleware,
    createWithdrawal
);

router.get(
    "/withdrawals",
    authMiddleware,
    getWithdrawalHistory
);

export default router;