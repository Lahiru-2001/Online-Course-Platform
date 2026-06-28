import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Certificate from './pages/student/Certificate';
import ProgressTracking from './pages/student/ProgressTracking';
import UserManagement from './pages/instructor/UserManagement';
import CourseList from './pages/course/CourseList';
import UserProfile from './pages/student/UserProfile';
import EditProfile from './pages/student/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to user-profile for preview */}
        <Route path="/" element={<Navigate to="/user-profile" replace />} />
        <Route path="/certificates" element={<Certificate />} />
        <Route path="/dashboard" element={<Certificate />} />
        <Route path="/my-courses" element={<Certificate />} />
        <Route path="/payment-review" element={<Certificate />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
