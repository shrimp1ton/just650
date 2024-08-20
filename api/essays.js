const mongoose = require('mongoose');
const Essay = require('../models/Essay');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if the database connection fails
  });

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { title, content, isAnonymous, authorName } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const essay = new Essay({
        title,
        content,
        isAnonymous,
        authorName: authorName || 'Anonymous',
        timestamp: new Date(),
        likes: 0,
      });

      await essay.save();
      return res.status(201).json(essay);
    }

    if (req.method === 'GET') {
      const sortBy = req.query.sortBy === 'mostRecent' ? { timestamp: -1 } : { likes: -1 };
      const essays = await Essay.find().sort(sortBy);
      return res.status(200).json(essays);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
