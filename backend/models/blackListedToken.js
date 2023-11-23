const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
