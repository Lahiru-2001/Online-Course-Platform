const express = require('express');
const router = express.Router();
const { generateCertificate, getUserCertificates } = require('../controllers/certificateController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// POST /api/certificates/generate  — Student only
router.post('/generate', authMiddleware, roleMiddleware('student'), generateCertificate);

// GET /api/certificates  — Student only
router.get('/', authMiddleware, roleMiddleware('student'), getUserCertificates);

module.exports = router;
