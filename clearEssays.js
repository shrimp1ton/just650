// clearEssays.js

const mongoose = require('mongoose');
const Essay = require('./models/Essay'); // Ensure the path is correct

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/just650', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Clear essays
async function clearEssays() {
  try {
    const result = await Essay.deleteMany({});
    console.log(`Deleted ${result.deletedCount} essays.`);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error deleting essays:', err);
  }
}

clearEssays();
