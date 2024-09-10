const Exam = require('../models/Exam');

exports.scheduleExam = async (req, res) => {
  const { title, scheduledDate, questions } = req.body;

  try {
    const exam = new Exam({
      title,
      scheduledDate,
      questions,
      createdBy: req.user.id,
    });

    await exam.save();
    res.json({ msg: 'Exam scheduled successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.publishResult = async (req, res) => {
  const { examId, results } = req.body;

  try {
    let exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }

    exam.results = results;
    await exam.save();

    res.json({ msg: 'Results published successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
