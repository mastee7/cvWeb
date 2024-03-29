const express = require("express");
const usersController = require("../controllers/usersController");
const { checkAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", usersController.registerUser);

// Route for user login
router.post("/login", usersController.loginUser);

// Router for user logout
router.post("/logout", usersController.logoutUser);

// Route for validating the token
router.get(
  "/validate-token",
  checkAuthenticated,
  usersController.validateToken
);

// // Route for user profile, requiring authentication
// router.get('/profile', usersController.checkAuthenticated, usersController.getUserProfile);

// // Route for updating user profile, requiring authentication
// router.put('/profile', usersController.checkAuthenticated, usersController.updateUserProfile);

module.exports = router;
