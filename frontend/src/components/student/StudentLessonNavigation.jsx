import React from 'react';

const StudentLessonNavigation = () => {
  return (
    <div className="lesson-navigation-footer">
      <button className="nav-btn-prev">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Previous Lesson
      </button>
      
      <button className="nav-btn-complete">
        Mark Lesson as Completed
      </button>
      
      <button className="nav-btn-next">
        Next Lesson
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default StudentLessonNavigation;
