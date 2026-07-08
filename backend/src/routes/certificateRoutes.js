import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
    getMyCertificates,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get(
    "/my",
    authMiddleware,
    getMyCertificates
);

export default router;