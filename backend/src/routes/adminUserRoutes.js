import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllUsers
);

router.get(
  "/:id",
  authMiddleware,
  getUserById
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateUserStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteUser
);

export default router;