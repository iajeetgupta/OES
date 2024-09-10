const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  questions: [
    {
      type: { type: String, enum: ['objective', 'subjective'], required: true },
      questionText: { type: String, required: true },
      options: [{ type: String }], // Only for objective questions
      answer: { type: String } // Only for subjective questions
    }
  ],
  isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Exam', ExamSchema);
