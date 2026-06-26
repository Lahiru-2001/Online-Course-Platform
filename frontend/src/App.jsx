import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CreateCoursePage from './pages/CreateCoursePage';

// Global Styles
import './styles/App.css';

/**
 * Main Application Component
 * 
 * Handles routing utilizing layout wrappers for clean component separation.
 */
function App() {
  return (
    <Router>
      <Routes>
        
        {/* Auth Routes with AuthLayout (Navbar + Footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        
        {/* Dashboard/Internal Routes with DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses/create" element={<CreateCoursePage />} />
        </Route>
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;
