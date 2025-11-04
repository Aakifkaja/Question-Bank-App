import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuestionsPage from './pages/QuestionsPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>Question Bank</h2>
        <div>
          <Link to="/">Questions</Link>
          <Link to="/create">Create</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<QuestionsPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
