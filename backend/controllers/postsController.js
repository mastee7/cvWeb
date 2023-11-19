// controllers/postsController.js
const Post = require('../models/post'); // Import the Post model
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
  try {
    // Destructure the title, description, and contributors from the request's body
    const { title, description, contributors } = req.body;
    
    // Check if all required fields are present
    if (!title || !description || !contributors || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create a new post instance using the Post model
    const post = new Post({
      title,
      description,
      contributors: contributors.split(','), // Assuming contributors are sent as a comma-separated string
      imageUrl: req.file.path // The path to the uploaded image
    });
    
    // Save the new post to the database
    await post.save();
    
    // Send a success response
    res.status(201).json({ message: 'Post created successfully!', post });
  } catch (error) {
    // Handle any errors that occur during the post creation
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    // Retrieve a single post by its ID from the database
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    // Update a single post by its ID with new data
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // Delete a single post by its ID
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Optionally delete the image associated with the post
    const imagePath = path.join(__dirname, '..', post.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
      }
      // Image deleted
    });
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
