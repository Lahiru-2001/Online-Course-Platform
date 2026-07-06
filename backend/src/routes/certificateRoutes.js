const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  getUserCertificates
} = require('../controllers/certificateController');

// POST /api/certificates/generate
router.post('/generate', generateCertificate);

// GET /api/certificates
router.get('/', getUserCertificates);

module.exports = router;
