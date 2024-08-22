// api/banUser.js
const { auth } = require('../firebaseAdmin'); // Initialize Firebase Admin SDK

module.exports = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const decodedToken = await auth.verifyIdToken(token);

  if (!decodedToken.admin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { uid } = req.query;

  try {
    await auth.setCustomUserClaims(uid, { banned: true });
    return res.status(200).json({ message: `User ${uid} has been banned.` });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
