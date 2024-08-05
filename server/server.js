// server.js
const express = require('express');
const cors = require('cors');  // Add this line
const mongoose = require('mongoose');
// ... other imports

const app = express();

// Use CORS middleware
app.use(cors());  // Add this line

// ... rest of your server setup

mongoose.connect('mongodb://localhost:27017/just650', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const Essay = mongoose.model('Essay', {
  content: String,
  isAnonymous: Boolean,
  authorName: String,
  timestamp: Date,
  likes: Number
});

app.use(express.json());

app.post('/api/essays', async (req, res) => {
  const essay = new Essay({
    content: req.body.content,
    isAnonymous: req.body.isAnonymous,
    authorName: req.body.authorName,
    timestamp: new Date(),
    likes: 0
  });
  await essay.save();
  res.status(201).json(essay);
});

app.get('/api/essays', async (req, res) => {
  const sortBy = req.query.sortBy === 'mostRecent' ? { timestamp: -1 } : { likes: -1 };
  const essays = await Essay.find().sort(sortBy);
  res.json(essays);
});

app.put('/api/essays/:id/like', async (req, res) => {
  const essay = await Essay.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(essay);
});

app.listen(3000, () => console.log('Server running on port 3000'));