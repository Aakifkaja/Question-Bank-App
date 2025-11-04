import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questions')) || [];
    const found = stored.find((q) => q.id === Number(id));
    if (found) {
      setQuestion(found.question);
      setChoices(found.choices);
      setCorrectAnswer(found.correctAnswer);
    }
  }, [id]);

  const handleChangeChoice = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem('questions')) || [];
    const updated = stored.map((q) =>
      q.id === Number(id)
        ? { ...q, question, choices, correctAnswer }
        : q
    );
    localStorage.setItem('questions', JSON.stringify(updated));
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label>Choices:</label>
        {choices.map((choice, i) => (
          <input
            key={i}
            type="text"
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
          Update Question
        </button>
      </form>
    </div>
  );
}

export default EditPage;
