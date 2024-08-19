// models/Essay.js

const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Make the title a required field
  },
  content: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  authorName: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Essay', EssaySchema);
