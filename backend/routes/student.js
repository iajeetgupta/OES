const express = require('express');
const { submitExam, getAvailableExams } = require('../controllers/studentController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/available-exams', authMiddleware, getAvailableExams);
router.post('/submit-exam', authMiddleware, submitExam);

module.exports = router;
