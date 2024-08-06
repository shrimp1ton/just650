// server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import the reply routes
const replyRoutes = require('./routes/replies');

const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Essay model
const Essay = mongoose.model('Essay', {
  title: String, // Include title if needed
  content: String,
  isAnonymous: Boolean,
  authorName: String,
  timestamp: Date,
  likes: Number
});

// Use the reply routes
app.use('/api/replies', replyRoutes);

// POST endpoint to create a new essay
app.post('/api/essays', async (req, res) => {
  const essay = new Essay({
    title: req.body.title, // Include title if needed
    content: req.body.content,
    isAnonymous: req.body.isAnonymous,
    authorName: req.body.authorName || 'Anonymous',
    timestamp: new Date(),
    likes: 0
  });
  await essay.save();
  res.status(201).json(essay);
});

// GET endpoint to fetch essays
app.get('/api/essays', async (req, res) => {
  const sortBy = req.query.sortBy === 'mostRecent' ? { timestamp: -1 } : { likes: -1 };
  const essays = await Essay.find().sort(sortBy);
  res.json(essays);
});

// PUT endpoint to like an essay
app.put('/api/essays/:id/like', async (req, res) => {
  const essay = await Essay.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(essay);
});

// Start the server using an environment variable for the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
