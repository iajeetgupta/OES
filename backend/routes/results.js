const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin'); // Ensure this middleware exists for admin routes

// Get user results
router.get('/user/results', auth, resultController.getUserResults);

// Get all results (Admin)
router.get('/admin/results', auth, admin, resultController.getAllResults);

module.exports = router;
