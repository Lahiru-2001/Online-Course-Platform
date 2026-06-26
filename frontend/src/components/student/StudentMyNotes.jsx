import React, { useState } from 'react';

const StudentMyNotes = () => {
  const [notesText, setNotesText] = useState('');

  return (
    <div className="learning-card">
      <h3 className="card-heading">My Notes</h3>
      <div className="notes-container">
        <textarea 
          className="notes-textarea" 
          placeholder="Take your personal notes here..."
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default StudentMyNotes;
