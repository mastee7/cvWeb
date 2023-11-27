const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blackListedToken');

const checkAuthenticated = async (req, res, next) => {
  // Check for the presence of the Authorization header
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    const tokenInBlacklist = await BlacklistedToken.findOne({ token });
    if (tokenInBlacklist) {
      return res.status(401).json({ message: 'Logged out token, access denied' });
    }

    // Verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // Handle different kinds of errors
        let message = 'Unauthorized access!';
        if (err.name === 'JsonWebTokenError') {
          message = 'Invalid token!';
        } else if (err.name === 'TokenExpiredError') {
          message = 'Your token has expired!';
        }
        
        // Send a detailed error response
        return res.status(403).json({ message, error: err.name });
      }

      // If the token is valid, attach the decoded token to the request
      // so that it can be used in subsequent route handlers
      req.user = decodedToken;
      next();
    });
  } else {
    // If there is no Authorization header, send an unauthorized status
    res.status(401).json({ message: 'No token provided, authorization denied!' });
  }
};

module.exports = { checkAuthenticated };
