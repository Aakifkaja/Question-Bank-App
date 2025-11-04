import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
    localStorage.setItem('questions', JSON.stringify(updated));
  };

  return (
    <div>
      <h2>All Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found. Create one!</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} className="question-card">
            <h3>{q.question}</h3>
            <ul>
              {q.choices.map((c, i) => (
                <li key={i}>
                 {c}  {i === q.correctAnswer && <strong>Correct</strong>}
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link to={`/edit/${q.id}`} className="btn-edit">Edit</Link>
              <button onClick={() => handleDelete(q.id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionsPage;
