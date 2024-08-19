const mongoose = require('mongoose');

const essaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  authorName: { type: String, default: 'Anonymous' },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

const Essay = mongoose.model('Essay', essaySchema);

module.exports = Essay;
