import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [newExam, setNewExam] = useState({ title: '', description: '', startTime: '', endTime: '', questions: [] });
  const [examToAdd, setExamToAdd] = useState({ type: 'objective', questionText: '', options: '' });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exam');
        setExams(response.data);
      } catch (err) {
        console.error('Error fetching exams:', err);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results/admin', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchExams();
    fetchResults();
  }, []);

  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setExamToAdd({ ...examToAdd, [name]: value });
  };

  const addQuestion = () => {
    setNewExam({
      ...newExam,
      questions: [...newExam.questions, { ...examToAdd, options: examToAdd.options.split(',') }]
    });
    setExamToAdd({ type: 'objective', questionText: '', options: '' });
  };

  const createExam = async () => {
    try {
      await axios.post('http://localhost:5000/api/exam', newExam, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Exam created successfully');
      setNewExam({ title: '', description: '', startTime: '', endTime: '', questions: [] });
      setExamToAdd({ type: 'objective', questionText: '', options: '' });
    } catch (err) {
      console.error('Error creating exam:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="create-exam">
        <h2>Create New Exam</h2>
        <form>
          <label>
            Title:
            <input type="text" name="title" value={newExam.title} onChange={handleExamChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={newExam.description} onChange={handleExamChange} />
          </label>
          <label>
            Start Time:
            <input type="datetime-local" name="startTime" value={newExam.startTime} onChange={handleExamChange} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" name="endTime" value={newExam.endTime} onChange={handleExamChange} />
          </label>
          <h3>Add Questions</h3>
          <label>
            Question Text:
            <input type="text" name="questionText" value={examToAdd.questionText} onChange={handleQuestionChange} />
          </label>
          <label>
            Options (comma-separated):
            <input type="text" name="options" value={examToAdd.options} onChange={handleQuestionChange} />
          </label>
          <button type="button" onClick={addQuestion}>Add Question</button>
          <button type="button" onClick={createExam}>Create Exam</button>
        </form>
      </div>

      <div className="exam-list">
        <h2>Existing Exams</h2>
        <ul>
          {exams.map(exam => (
            <li key={exam._id}>
              <h3>{exam.title}</h3>
              <p>{exam.description}</p>
              <p>Start Time: {new Date(exam.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(exam.endTime).toLocaleString()}</p>
              <button onClick={() => alert('Functionality to edit exam')}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="result-list">
        <h2>All Results</h2>
        <ul>
          {results.map(result => (
            <li key={result._id}>
              <p>Exam: {result.examId.title}</p>
              <p>User: {result.userId.name}</p>
              <p>Score: {result.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
