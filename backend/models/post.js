const mongoose = require('mongoose');

// Create a schema for the Post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  contributors: [{
    type: String,
    required: true,
    trim: true,
  }],
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true // this will add createdAt and updatedAt timestamps
});

// Compile and export the model
module.exports = mongoose.model('Post', postSchema);
