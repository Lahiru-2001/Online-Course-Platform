import React, { useState } from 'react';

const StudentQuiz = () => {
  const [selectedQuizOption, setSelectedQuizOption] = useState(0);

  const quizOptions = [
    "User Interface",
    "User Interface",
    "User Interface"
  ];

  return (
    <div className="learning-card">
      <h3 className="card-heading">Quiz</h3>
      <div className="quiz-container">
        <p className="quiz-question">01. What does UI stand for?</p>
        
        <div className="quiz-options-list">
          {quizOptions.map((option, idx) => {
            const isSelected = selectedQuizOption === idx;
            return (
              <button 
                key={idx}
                className={`quiz-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedQuizOption(idx)}
              >
                <div className="option-left">
                  <span className="option-dot-icon"></span>
                  <span className="option-text">{option}</span>
                </div>
                {isSelected && (
                  <svg className="option-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <div className="quiz-actions">
          <button className="quiz-btn-submit">Submit</button>
          <button className="quiz-btn-next">Next Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
