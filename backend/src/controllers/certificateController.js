const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// Helper to generate a PDF certificate in static/certificates directory
const generatePDFFile = async (studentName, courseName, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
      const dirPath = path.join(__dirname, '..', '..', 'public', 'certificates');
      
      // Ensure directory exists
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const filePath = path.join(dirPath, filename);
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Certificate Background Design
      doc.rect(20, 20, 802, 555).lineWidth(15).stroke('#1e3a5f');
      doc.rect(35, 35, 772, 525).lineWidth(5).stroke('#f97316');

      // Title
      doc.moveDown(4);
      doc.font('Helvetica-Bold').fontSize(40).fillColor('#1e3a5f').text('CERTIFICATE OF COMPLETION', { align: 'center' });
      
      doc.moveDown(1);
      doc.font('Helvetica').fontSize(16).fillColor('#4b5563').text('This is proudly presented to', { align: 'center' });
      
      // Student Name
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fontSize(32).fillColor('#f97316').text(studentName, { align: 'center' });

      doc.moveDown(1);
      doc.font('Helvetica').fontSize(16).fillColor('#4b5563').text('for successfully completing the online learning course', { align: 'center' });

      // Course Name
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fontSize(24).fillColor('#1e3a5f').text(courseName, { align: 'center' });

      // Issue Date
      doc.moveDown(2);
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      doc.font('Helvetica-Oblique').fontSize(14).fillColor('#6b7280').text(`Issued on: ${today}`, { align: 'center' });

      // Footer signature decoration
      doc.moveDown(2);
      doc.font('Helvetica-Bold').fontSize(14).fillColor('#1e3a5f').text('LMS Platform Sri Lanka', { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(`/public/certificates/${filename}`);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Generate a certificate for a completed course
// @route   POST /api/certificates/generate
// @access  Private (Student)
const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    // 1. Verify user is enrolled and has completed the course
    const enrollment = await Enrollment.findOne({ student: req.user.id, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment record not found for this course' });
    }

    if (enrollment.status !== 'completed' && enrollment.progress < 100) {
      return res.status(400).json({ success: false, message: 'Course is not completed yet. Progress must be 100%' });
    }

    // 2. Check if certificate already exists
    const existingCert = await Certificate.findOne({ student: req.user.id, course: courseId });
    if (existingCert) {
      return res.status(200).json({ 
        success: true, 
        message: 'Certificate already generated', 
        certificate: existingCert 
      });
    }

    // 3. Fetch course and user details
    const course = await Course.findById(courseId);
    const student = await User.findById(req.user.id);
    
    if (!course || !student) {
      return res.status(404).json({ success: false, message: 'Course or Student details not found' });
    }

    // 4. Generate unique filename and PDF file
    const filename = `cert_${req.user.id}_${courseId}.pdf`;
    const certificateUrl = await generatePDFFile(student.name, course.title, filename);

    // 5. Create Certificate Record in DB
    const certificate = await Certificate.create({
      student: req.user.id,
      course: courseId,
      certificateUrl
    });

    res.status(201).json({ 
      success: true, 
      message: 'Certificate generated successfully', 
      certificate 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all certificates for the logged-in student
// @route   GET /api/certificates
// @access  Private (Student)
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id })
      .populate('course', 'title');

    res.status(200).json({ 
      success: true, 
      message: 'Certificates retrieved successfully', 
      data: certificates 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateCertificate,
  getUserCertificates
};
