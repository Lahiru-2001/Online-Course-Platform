const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');

// Get all assignments for a specific course
const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required.' });
    }

    const assignments = await Assignment.find({ course: courseId }).sort({ dueDate: 1 });
    
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching course assignments:', error);
    res.status(500).json({ message: 'Failed to fetch assignments for this course.' });
  }
};

// Handle student assignment submissions (file uploads, links, etc.)
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body;
    
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId || !fileUrl) {
      return res.status(400).json({ message: 'User ID and file URL are required.' });
    }

    // Verify the assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found.' });
    }

    // Check for an existing submission to update it, otherwise create a new one
    let submission = await AssignmentSubmission.findOne({ assignment: assignmentId, user: userId });

    if (submission) {
      submission.fileUrl = fileUrl;
      // Note: Consider resetting the grade or notifying the instructor upon resubmission
      await submission.save();
      
      return res.status(200).json({
        message: 'Assignment submission updated successfully.',
        submission,
      });
    } else {
      submission = new AssignmentSubmission({
        assignment: assignmentId,
        user: userId,
        fileUrl: fileUrl,
      });
      await submission.save();
      
      return res.status(201).json({
        message: 'Assignment submitted successfully.',
        submission,
      });
    }

  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'An error occurred while processing the submission.' });
  }
};

module.exports = {
  getCourseAssignments,
  submitAssignment,
};
