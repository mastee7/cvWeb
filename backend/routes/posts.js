const express = require('express');
const multer = require('multer');
const { checkAuthenticated } = require('../middlewares/authMiddleware');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // You can use the original name or add a timestamp for uniqueness
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set up file filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Initialize multer with the storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.post('/', checkAuthenticated, upload.single('image'), postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', checkAuthenticated, upload.single('image'), postsController.updatePost);
router.delete('/:id', checkAuthenticated, postsController.deletePost);

module.exports = router;
