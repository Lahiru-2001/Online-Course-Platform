// Placeholder controller for enrollments
const getEnrollments = async (req, res) => res.json({ message: 'Get all enrollments' });
const getEnrollmentById = async (req, res) => res.json({ message: 'Get enrollment by ID' });
const createEnrollment = async (req, res) => res.json({ message: 'Create enrollment' });
const updateEnrollment = async (req, res) => res.json({ message: 'Update enrollment' });
const deleteEnrollment = async (req, res) => res.json({ message: 'Delete enrollment' });

module.exports = { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };
