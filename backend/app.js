// This file set up your Express server, integrate middleware, and define routes.
// Which is the entry point of the application

const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { checkAuthenticated } = require('./middlewares/authMiddleware');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

// Security headers
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static('public'));


// File upload middleware configuration
// You can configure the storage, file filter, limits, etc.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // You can use the original name or add a timestamp for uniqueness
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Define an array of allowed MIME types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  // Check if the uploaded file's MIME type is in the allowed list
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Unsupported file type'), false); // Reject file
  }
};


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB file size limit
  }
});

// Use routes from separate files
app.use('/api/posts', postRoutes(upload, checkAuthenticated)); // We pass the multer and auth middleware to routes
app.use('/api/users', userRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
