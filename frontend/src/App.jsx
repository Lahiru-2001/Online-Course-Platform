import React, { useState } from 'react';
import Landing from './pages/course/Landing';
import Learning from './pages/student/Learning';
import LerningCompleate from './pages/student/LerningCompleate';
import Forum from './pages/student/Forum';
import Notifications from './pages/student/Notifications';
import './App.css';

function App() {
  // Set default view to 'Notifications' so the notifications page displays immediately
  const [view, setView] = useState('Notifications');

  return (
    <div className="App">
      {view === 'landing' && <Landing onGoToPortal={() => setView('learning')} />}
      {view === 'learning' && <Learning onBackToLanding={() => setView('landing')} />}
      {view === 'LerningCompleate' && <LerningCompleate onBackToLanding={() => setView('landing')} />}
      {view === 'Forum' && <Forum onBackToLanding={() => setView('landing')} />}
      {view === 'Notifications' && (
        <Notifications
          onBackToLanding={() => setView('landing')}
          onNavigateToForum={() => setView('Forum')}
          onNavigateToLearning={() => setView('learning')}
        />
      )}
    </div>
  );
}

export default App;
