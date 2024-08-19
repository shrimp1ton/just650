// routes/replies.js
const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply');

// POST a new reply
router.post('/', async (req, res) => {
  const { essayId, content, authorName } = req.body;
  
  const reply = new Reply({
    essayId,
    content,
    authorName: authorName || 'Anonymous',
  });

  try {
    const savedReply = await reply.save();
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET replies for a specific essay
router.get('/:essayId', async (req, res) => {
  try {
    const replies = await Reply.find({ essayId: req.params.essayId }).sort({ timestamp: 1 });
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: DELETE a reply
router.delete('/:id', async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    await reply.remove();
    res.json({ message: 'Reply deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
