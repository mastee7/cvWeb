// This file set up your Express server, integrate middleware, and define routes.
// Which is the entry point of the application
const connectDB = require("./database");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { checkAuthenticated } = require("./middlewares/authMiddleware");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");

const app = express();

// connect to mongodb
connectDB();

// Security headers
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static("public"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

// File upload middleware configuration
// You can configure the storage, file filter, limits, etc.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // You can use the original name or add a timestamp for uniqueness
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Define an array of allowed MIME types
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];

  // Check if the uploaded file's MIME type is in the allowed list
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Unsupported file type"), false); // Reject file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB file size limit
  },
});

// Root route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Welcome Page</title>
      <style>
        body { font-family: Arial, sans-serif; }
        ul { line-height: 1.6; }
      </style>
    </head>
    <body>
      <h1>Welcome to the CV Club at ASU website API</h1>
      <p>This API is built using <strong>Express.js</strong>, a web framework for <strong>Node.js</strong>.</p>
      <p>Below are the available routes:</p>

      <h2>Users Routes</h2>
      <ul>
        <li><b>POST /api/users/register</b> - Register a new user</li>
        <li><b>POST /api/users/login</b> - Login a user</li>
        <li><b>GET /api/users/validate-token</b> - Validate user's token (Requires Authentication)</li>
        <li><b>GET /api/users/logout</b> - Logout a user (Requires Authentication)</li>
      </ul>

      <h2>Posts Routes</h2>
      <ul>
        <li><b>POST /api/posts</b> - Create a new post (Requires Authentication and Image Upload)</li>
        <li><b>GET /api/posts</b> - Retrieve all posts</li>
        <li><b>GET /api/posts/:id</b> - Retrieve a post by ID</li>
        <li><b>PUT /api/posts/:id</b> - Update a post by ID (Requires Authentication and Image Upload)</li>
        <li><b>DELETE /api/posts/:id</b> - Delete a post by ID (Requires Authentication)</li>
      </ul>
    </body>
    </html>
  `);
});

// Use routes from separate files
app.use("/api/posts", postRoutes); // We pass the multer and auth middleware to routes
app.use("/api/users", userRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
