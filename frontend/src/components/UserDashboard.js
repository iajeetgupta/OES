import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserDashboard.css'; // Import CSS file for styling

const UserDashboard = () => {
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

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
        const response = await axios.get('http://localhost:5000/api/results/user', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchExams();
    fetchResults();
  }, []);

  const startExam = (exam) => {
    setCurrentExam(exam);
  };

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const submitExam = async () => {
    try {
      await axios.post('http://localhost:5000/api/exam/submit', { examId: currentExam._id, answers }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setCurrentExam(null);
      setAnswers({});
      alert('Exam submitted successfully');
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {currentExam ? (
        <div>
          <h2>{currentExam.title}</h2>
          <p>{currentExam.description}</p>
          <form onSubmit={(e) => { e.preventDefault(); submitExam(); }}>
            {currentExam.questions.map((q, index) => (
              <div key={index}>
                <p>{q.questionText}</p>
                {q.type === 'objective' ? (
                  q.options.map((opt, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={opt}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                      {opt}
                    </label>
                  ))
                ) : (
                  <textarea
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="submit">Submit Exam</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Available Exams</h2>
          <ul>
            {exams.map((exam) => (
              <li key={exam._id}>
                {exam.title} - {exam.description}
                <button onClick={() => startExam(exam)}>Start Exam</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="result-list">
        <h2>My Results</h2>
        <ul>
          {results.map(result => (
            <li key={result._id}>
              <p>Exam: {result.examId.title}</p>
              <p>Score: {result.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
