// controllers/userController.js
const admin = require('../utils/firebase');

const getUserData = async (req, res) => {
    // The user ID should be part of the decoded token payload
    const userId = req.user.uid; // Assuming the middleware adds the uid to req.user

    try {
        // Fetch the user data from Firebase
        const userRecord = await admin.auth().getUser(userId);

        if (!userRecord) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct user data to return, excluding sensitive information
        const userData = {
            id: userRecord.uid,
            firstName: userRecord.displayName ? userRecord.displayName.split(' ')[0] : null,
            lastName: userRecord.displayName ? userRecord.displayName.split(' ')[1] : null,
            email: userRecord.email,
            // Include other fields you want to return
        };

        // Return the user data
        res.status(200).json({ userData });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
};

module.exports = { getUserData };