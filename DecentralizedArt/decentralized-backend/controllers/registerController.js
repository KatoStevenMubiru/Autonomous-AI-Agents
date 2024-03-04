// controllers/registerController.js
const firebaseAdmin = require('firebase-admin');
const sendRegistrationEmail = require('../utils/sendRegistrationEmail');

// Initialize Firebase Admin SDK
// Make sure you have initialized Firebase Admin with the appropriate credentials before this step
// firebaseAdmin.initializeApp({ ... });

const register = async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;

  try {
    // Create a new user with Firebase Authentication
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Generate a verification token
    const verificationToken = await firebaseAdmin.auth().createCustomToken(userRecord.uid);

    // Send a registration email to the user
    await sendRegistrationEmail(email, firstName, verificationToken);

    // Respond with a success message
    res.status(201).json({
      message: 'User registered successfully',
      userId: userRecord.uid, // Include the Firebase user ID in the response
    });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 'auth/email-already-exists') {
      res.status(400).json({ message: 'Email already in use' });
    } else if (error.code === 'auth/invalid-email') {
      res.status(400).json({ message: 'Invalid email' });
    } else {
      res.status(400).json({ message: 'Error registering user', error: error.message });
    }
  }
};

module.exports = register;