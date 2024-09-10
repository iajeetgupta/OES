const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // Ensure this path is correct

// Signup route
router.post('/register', signup);

// Login route
router.post('/login', login);

module.exports = router;
