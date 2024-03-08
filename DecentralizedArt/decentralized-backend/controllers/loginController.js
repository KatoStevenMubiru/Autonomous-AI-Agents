// controllers/loginController.js
const admin = require('../utils/firebase');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Firebase Authentication to sign in the user
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();

    // Generate a custom token for the user
    const customToken = await admin.auth().createCustomToken(user.uid);

    // Set the custom token in an HTTP-only cookie
    res.cookie('session', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000 // Set cookie expiration time (e.g., 1 hour)
    });

    // Respond to indicate successful login
    res.status(200).json({
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    if (error.code === 'auth/user-not-found') {
      res.status(404).json({ message: 'User not found' });
    } else if (error.code === 'auth/invalid-email') {
      res.status(400).json({ message: 'Invalid email' });
    } else {
      res.status(400).json({ message: 'Error logging in user', error: error.message });
    }
  }
};

module.exports = login;