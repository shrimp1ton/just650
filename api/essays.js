const mongoose = require('mongoose');
const Essay = require('../models/essay');


// Ensure connection only happens once in a serverless environment
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = async (req, res) => {
 if (req.method === 'POST') {
   const essay = new Essay({
     title: req.body.title,
     content: req.body.content,
     isAnonymous: req.body.isAnonymous,
     authorName: req.body.authorName || 'Anonymous',
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


 return res.status(405).end(); // Method Not Allowed
};




