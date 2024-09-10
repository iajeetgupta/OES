const Exam = require('../models/Exam');
const Result = require('../models/Result');

// Create an exam
exports.createExam = async (req, res) => {
  const { title, description, startTime, endTime, questions } = req.body;

  try {
    const newExam = new Exam({
      title,
      description,
      startTime,
      endTime,
      questions
    });

    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating exam' });
  }
};

// Get all active exams
exports.getActiveExams = async (req, res) => {
  try {
    const now = new Date();
    const exams = await Exam.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
      isActive: true
    });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching exams' });
  }
};

// Submit exam answers
exports.submitExam = async (req, res) => {
  const { examId, answers } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }

    let score = 0;
    exam.questions.forEach((q, index) => {
      if (q.type === 'objective' && answers[index] === q.answer) {
        score += 1;
      }
      // For subjective questions, you could implement a scoring system here
    });

    const result = new Result({
      examId,
      userId,
      answers,
      score
    });

    await result.save();
    res.status(200).json({ msg: 'Exam submitted successfully', score });
  } catch (error) {
    res.status(500).json({ msg: 'Error submitting exam' });
  }
};

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
