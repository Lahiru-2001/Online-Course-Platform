import React, { useState } from 'react';
import Landing from './pages/course/Landing';
import Learning from './pages/student/Learning';
import './App.css';

function App() {
  // Default to 'learning' so the user's newly requested student learning page is rendered first
  const [view, setView] = useState('learning');

  return (
    <div className="App">
      {view === 'landing' ? (
        <Landing onGoToPortal={() => setView('learning')} />
      ) : (
        <Learning onBackToLanding={() => setView('landing')} />
      )}
    </div>
  );
}

export default App;
