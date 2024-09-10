const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Map, of: String }, // User's answers
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('Result', ResultSchema);
