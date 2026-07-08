import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import adminCourseRoutes from "./routes/adminCourseRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminPaymentRoutes from "./routes/adminPaymentRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Online Course Platform API Running",
  });
});

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin/courses", adminCourseRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/chat", chatRoutes);

export default app;