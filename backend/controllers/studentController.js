const Exam = require('../models/Exam');

exports.submitExam = async (req, res) => {
  const { examId, answers } = req.body;

  try {
    let exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }

    const result = {
      student: req.user.id,
      answers,
    };

    exam.results.push(result);
    await exam.save();

    res.json({ msg: 'Exam submitted successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getAvailableExams = async (req, res) => {
  try {
    const exams = await Exam.find({ scheduledDate: { $gte: new Date() } });
    res.json(exams);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
