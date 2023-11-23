const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blackListedToken');

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, academicYear, major, role, password } = req.body;
    
    try {
        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            firstName,
            lastName,
            email,
            academicYear,
            major,
            role,
            password // This will be hashed automatically by the pre-save hook in your User model
        });

        // Save the user to the database
        await user.save();

        // Generate a token (optional)
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send back a token and the user info
        res.status(201).json({ token, userId: user._id, firstName, lastName, role });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token validity
        );

        // Send back a token and user info
        res.json({ token, userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.logoutUser = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const expiryDate = new Date(decodedToken.exp * 1000); // Convert UNIX epoch to JS Date
  
      // Save the token to the blacklist
      await new BlacklistedToken({ token, expiryDate }).save();
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


exports.validateToken = (req, res) => {
    // If the middleware didn't throw an error, the token is good
    res.status(200).json({ message: 'Token is valid', userId: req.user.userId });
};
