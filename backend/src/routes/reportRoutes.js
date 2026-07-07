const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  getRevenueReport,
  getEnrollmentReport
} = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/reports/analytics - Admin only
router.get('/analytics', authMiddleware, roleMiddleware('admin'), getAnalytics);

// GET /api/reports/revenue - Admin only
router.get('/revenue', authMiddleware, roleMiddleware('admin'), getRevenueReport);

// GET /api/reports/enrollments - Admin only
router.get('/enrollments', authMiddleware, roleMiddleware('admin'), getEnrollmentReport);

module.exports = router;
