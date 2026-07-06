const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPaymentHistory
} = require('../controllers/paymentController');

// POST /api/payments/process
router.post('/process', processPayment);

// GET /api/payments/history
router.get('/history', getPaymentHistory);

module.exports = router;
