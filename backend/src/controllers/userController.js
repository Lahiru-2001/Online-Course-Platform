// We need the User model to talk to the database
const User = require('../models/User');

// Fetch a single user's profile data
const getProfile = async (req, res) => {
  try {
    // Grab the ID from the logged-in user, or just use the URL param for easy testing
    let id = req.user ? req.user.id : req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Hey, we need a User ID first!" });
    }

    // Look them up in the DB
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({ message: "Couldn't find that user." });
    }

    // Send back the data (but don't send the password!)
    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      profilePicture: foundUser.profilePicture,
      role: foundUser.role,
    });
    
  } catch (err) {
    console.error("Oops, error getting profile:", err);
    res.status(500).json({ message: "Something went wrong on our end." });
  }
};

// Update user details like name, email, or profile pic
const updateProfile = async (req, res) => {
  try {
    let id = req.user ? req.user.id : req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Need an ID to update the profile." });
    }

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update the fields only if they were sent in the request
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    // If they want to change their password, update it too
    // TODO: Remember to hash this before saving when we add bcrypt later!
    if (req.body.password) {
      user.password = req.body.password; 
    }

    // Save changes to the database
    const updatedUser = await user.save();

    // Send the updated info back to the client
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      role: updatedUser.role,
    });
    
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Server encountered an error while updating." });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
