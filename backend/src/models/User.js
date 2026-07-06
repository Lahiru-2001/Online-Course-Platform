const mongoose = require('mongoose');

// Define what a User looks like in our database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Come on, everybody has a name!'],
    },
    email: {
      type: String,
      required: [true, 'We need an email to contact you.'],
      unique: true, // No duplicate emails allowed
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Don\'t forget your password!'],
      minlength: 6,
      // We don't want to accidentally send passwords back in API responses
      select: false, 
    },
    profilePicture: {
      type: String,
      default: 'default-avatar.png', // Fallback if they don't upload one
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student', // Most people signing up will just be students
    },
  },
  {
    // This automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
