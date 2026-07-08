import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAdminPayments } from "../controllers/adminPaymentController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAdminPayments
);

export default router;