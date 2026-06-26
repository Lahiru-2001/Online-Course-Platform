import React, { useState } from 'react';
import Landing from './pages/course/Landing';
import Learning from './pages/student/Learning';
import LerningCompleate from './pages/student/LerningCompleate';
import Forum from './pages/student/Forum';
import './App.css';

function App() {
  // Set default view to 'Forum' so the forum page displays immediately
  const [view, setView] = useState('Forum');

  return (
    <div className="App">
      {view === 'landing' && <Landing onGoToPortal={() => setView('learning')} />}
      {view === 'learning' && <Learning onBackToLanding={() => setView('landing')} />}
      {view === 'LerningCompleate' && <LerningCompleate onBackToLanding={() => setView('landing')} />}
      {view === 'Forum' && <Forum onBackToLanding={() => setView('landing')} />}
    </div>
  );
}

export default App;
