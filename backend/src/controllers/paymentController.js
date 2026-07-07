const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');

// @desc    Process a payment & auto-enroll student on success
// @route   POST /api/payments/process
// @access  Private (Student)
const processPayment = async (req, res) => {
  try {
    const { amount, courseId, paymentMethod } = req.body;

    if (!amount || !courseId || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Amount, courseId, and paymentMethod are required' });
    }

    // Mock processing success: generate transactionId
    const transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment history in DB
    const payment = await Payment.create({
      student: req.user.id,
      course: courseId,
      amount,
      status: 'completed',
      paymentMethod,
      transactionId
    });

    // Auto-create or update course enrollment for student
    let enrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        student: req.user.id,
        course: courseId,
        paymentStatus: 'paid',
        status: 'active'
      });
    } else {
      enrollment.paymentStatus = 'paid';
      enrollment.status = 'active';
      await enrollment.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Payment processed & student enrolled successfully', 
      data: payment,
      enrollment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get payment history for the logged-in student
// @route   GET /api/payments/history
// @access  Private (Student)
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user.id })
      .populate('course', 'title price')
      .sort({ paymentDate: -1 });

    res.status(200).json({ 
      success: true, 
      message: 'Payment history retrieved successfully', 
      data: payments 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  processPayment,
  getPaymentHistory
};
