const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');

// We are temporarily passing the user ID in the URL to make testing easier.
// Once we add a proper login/auth system, we can change these back to just '/'
// and grab the ID securely from the logged-in user's token.
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

module.exports = router;
