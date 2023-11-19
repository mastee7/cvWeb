// routes/users.js
const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Route for user registration
router.post('/register', usersController.registerUser);

// Route for user login
router.post('/login', usersController.loginUser);

// Route for user profile, requiring authentication
router.get('/profile', usersController.checkAuthenticated, usersController.getUserProfile);

// Route for updating user profile, requiring authentication
router.put('/profile', usersController.checkAuthenticated, usersController.updateUserProfile);

// Route for user logout
router.get('/logout', usersController.logoutUser);

module.exports = router;

