const Result = require('../models/Result');
const Exam = require('../models/Exam');

// Get user results
exports.getUserResults = async (req, res) => {
  const userId = req.user.id; // From auth middleware

  try {
    const results = await Result.find({ userId }).populate('examId');
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching results' });
  }
};

// Get all results (Admin)
exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate('examId').populate('userId');
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching results' });
  }
};
