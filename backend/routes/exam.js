const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const auth = require('../middleware/auth');

// Create an exam
router.post('/create', auth, examController.createExam);

// Get all active exams
router.get('/active', auth, examController.getActiveExams);

// Submit exam answers
router.post('/submit', auth, examController.submitExam);

// Get user results
router.get('/results', auth, examController.getUserResults);

module.exports = router;
