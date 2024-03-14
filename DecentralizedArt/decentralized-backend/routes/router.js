//routes/router.js
const express = require('express');
const register = require('../controllers/registerController');
const login = require('../controllers/loginController');
const verify = require('../controllers/verificationController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verify', verify)

module.exports = router;