// controllers/verificationController.js
const admin = require('../utils/firebase');

const verifyAccount = async (req, res) => {
  const { token } = req.query; // or req.body, depending on how you send the token

  try {
    // Verify the custom token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    // Check if the token has a verify flag set to true
    if (decodedToken.verify !== true) {
      return res.status(400).json({ message: 'Token is not for verification' });
    }

    // Set the user's email as verified
    await admin.auth().updateUser(decodedToken.uid, {
      emailVerified: true
    });

    // Redirect to the login page with a verified query parameter
    res.redirect(`https://contacts-frontend-beta.vercel.app/login?verified=true`);
  } catch (error) {
    console.error('Error verifying account:', error);
    res.status(500).json({ message: 'Error verifying account', error: error.message });
  }
};

module.exports = verifyAccount;