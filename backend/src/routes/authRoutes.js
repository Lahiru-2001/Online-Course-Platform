import express from "express";

import {
  registerStudent,
  registerInstructor,
  loginUser,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  registerStudent
);

router.post(
  "/register-instructor",
  registerValidation,
  registerInstructor
);

router.post(
  "/login",
  loginValidation,
  loginUser
);

export default router;