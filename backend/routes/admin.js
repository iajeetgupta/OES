const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Protected route for admin panel
router.post('/schedule-exam', auth, (req, res) => {
  // Add your exam scheduling logic here
  res.send('Exam scheduled successfully');
});

module.exports = router;
