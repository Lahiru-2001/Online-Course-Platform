const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');

// Handles student assignment submissions (file uploads, links, etc.)
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    // We are expecting a URL to a file (like an AWS S3 link, Google Drive link, etc.)
    const { fileUrl } = req.body;
    
    // Auth fallback
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId || !fileUrl) {
      return res.status(400).json({ message: 'Need both your user ID and the file URL to submit your work.' });
    }

    // Make sure they aren't submitting to a phantom assignment
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Could not find that assignment. Did the instructor delete it?' });
    }

    // Check if the student has already submitted this before
    // If they have, we'll just update it instead of making a duplicate
    let submission = await AssignmentSubmission.findOne({ assignment: assignmentId, user: userId });

    if (submission) {
      // Overwrite the old submission with the new one
      submission.fileUrl = fileUrl;
      // TODO: Maybe reset the grade if they resubmit?
      // submission.grade = null; 
      await submission.save();
      
      return res.status(200).json({
        message: 'Your assignment submission was successfully updated!',
        submission,
      });
    } else {
      // First time submitting! Create a fresh record
      submission = new AssignmentSubmission({
        assignment: assignmentId,
        user: userId,
        fileUrl: fileUrl,
      });
      await submission.save();
      
      return res.status(201).json({
        message: 'Assignment submitted successfully. Great job!',
        submission,
      });
    }

  } catch (error) {
    console.error('Error on assignment submission:', error);
    res.status(500).json({ message: 'Failed to process the assignment submission.' });
  }
};

module.exports = {
  submitAssignment,
};
