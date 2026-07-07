const express = require('express');
const router = express.Router();
const { processPayment, getPaymentHistory } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// POST /api/payments/process  — Student only
router.post('/process', authMiddleware, roleMiddleware('student'), processPayment);

// GET /api/payments/history  — Student only
router.get('/history', authMiddleware, roleMiddleware('student'), getPaymentHistory);

module.exports = router;
