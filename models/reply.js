const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  essayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Essay', required: true },
  content: { type: String, required: true },
  authorName: { type: String, default: 'Anonymous' },
  timestamp: { type: Date, default: Date.now },
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
