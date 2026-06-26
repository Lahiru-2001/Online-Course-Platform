import React, { useState } from 'react';
import Landing from './pages/course/Landing';
import Learning from './pages/student/Learning';
import LerningCompleate from './pages/student/LerningCompleate';
import './App.css';

function App() {
  // Default to 'LerningCompleate' so the student learning page is rendered first
  const [view, setView] = useState('LerningCompleate');

  return (
    <div className="App">
      {view === 'landing' && <Landing onGoToPortal={() => setView('learning')} />}
      {view === 'learning' && <Learning onBackToLanding={() => setView('landing')} />}
      {view === 'LerningCompleate' && <LerningCompleate onBackToLanding={() => setView('landing')} />}
    </div>
  );
}

export default App;
