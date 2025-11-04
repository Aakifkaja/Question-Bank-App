import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleChangeChoice = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || choices.some((c) => !c.trim())) {
      alert('Please fill in all fields');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('questions')) || [];
    const newQuestion = {
      id: Date.now(),
      question,
      choices,
      correctAnswer,
    };

    localStorage.setItem('questions', JSON.stringify([...stored, newQuestion]));
    navigate('/');
  };

  return (
    <div>
      <h2>Create Question</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Question:</label>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label>Choices:</label>
        {choices.map((choice, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Choice ${i + 1}`}
            value={choice}
            onChange={(e) => handleChangeChoice(i, e.target.value)}
          />
        ))}

        <label>Correct Answer:</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
        >
          {choices.map((_, i) => (
            <option key={i} value={i}>
              Choice {i + 1}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-submit">
          Save Question
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
