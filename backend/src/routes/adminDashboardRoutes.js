import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAdminDashboard } from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getAdminDashboard
);

export default router;