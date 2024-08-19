// models/Reply.js
const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  essayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Essay',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    default: 'Anonymous',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reply', ReplySchema);
