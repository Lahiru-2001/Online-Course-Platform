import express from "express";

import {
  getAdminReport,
  getInstructorReport,
} from "../controllers/reportController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorize("Administrator"),
  getAdminReport
);

router.get(
  "/instructor",
  protect,
  authorize("Instructor"),
  getInstructorReport
);

export default router;