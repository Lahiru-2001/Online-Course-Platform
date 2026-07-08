import express from "express";

import {
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/adminController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getAdminProfile
);

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateAdminProfile
);

export default router;