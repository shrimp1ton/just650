// api/clearEssays.js

const mongoose = require('mongoose');
const Essay = require('../models/Essay'); // Ensure the path is correct

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = async (req, res) => {
  try {
    const result = await Essay.deleteMany({});
    console.log(`Deleted ${result.deletedCount} essays.`);
    res.status(200).json({ message: `Deleted ${result.deletedCount} essays.` });
  } catch (err) {
    console.error('Error deleting essays:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    mongoose.connection.close();
  }
};
