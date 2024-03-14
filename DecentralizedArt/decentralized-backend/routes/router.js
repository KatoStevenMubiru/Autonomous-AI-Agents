//routes/router.js
const express = require('express');
const register = require('../controllers/registerController');
const login = require('../controllers/loginController');
const verifyAccount = require('../controllers/verificationController');
const { getUserData } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');



const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verify', verifyAccount);

router.get('/me', authenticateToken, getUserData);


module.exports = router;