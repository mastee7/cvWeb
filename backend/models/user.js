const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for the User
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  academicYear: {
    type: Number,
    required: true
  },
  major: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ['President', 'Vice President', 'Technical Officer', 'Officer'], 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});


// To hash the password
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare the given password with the database hash
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Compile and export the model
module.exports = mongoose.model('User', userSchema);
