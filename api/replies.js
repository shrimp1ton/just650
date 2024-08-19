const mongoose = require('mongoose');
const Reply = require('../models/reply');


// Ensure connection only happens once in a serverless environment
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = async (req, res) => {
 if (req.method === 'POST') {
   const reply = new Reply({
     essayId: req.body.essayId,
     content: req.body.content,
     authorName: req.body.authorName || 'Anonymous',
     timestamp: new Date(),
   });


   await reply.save();
   return res.status(201).json(reply);
 }


 if (req.method === 'GET') {
   const replies = await Reply.find({ essayId: req.query.essayId });
   return res.status(200).json(replies);
 }


 return res.status(405).end(); // Method Not Allowed
};
