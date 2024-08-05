const express = require('express');
const router = express.Router();
const Essay = require('../models/Essay');

// POST a new essay
router.post('/', async (req, res) => {
  const { title, content, isAnonymous, authorName } = req.body;

  // Check if title and content are provided
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    // Create a new essay with the title
    const newEssay = new Essay({
      title,
      content,
      isAnonymous,
      authorName: authorName || 'Anonymous',
    });

    // Save the essay to the database
    const savedEssay = await newEssay.save();
    res.status(201).json(savedEssay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
