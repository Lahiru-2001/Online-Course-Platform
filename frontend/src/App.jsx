import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// ─── Dinisuru's Pages ───
import Landing from './pages/course/Landing';
import Learning from './pages/student/Learning';
import LerningCompleate from './pages/student/LerningCompleate';
import Forum from './pages/student/Forum';
import Notifications from './pages/student/Notifications';

// ─── Chamindu's Pages ───
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminPayment from './pages/admin/AdminPayment';
import ManageCourse from './pages/instructor/ManageCourse';
import UploadMaterial from './pages/instructor/UploadMaterial';
import ChatPage from './pages/communication/ChatPage';

// ─── Gihan's Pages ───
import CourseList from './pages/course/CourseList';
import UserProfile from './pages/student/UserProfile';
import EditProfile from './pages/student/EditProfile';
import Certificate from './pages/student/Certificate';
import ProgressTracking from './pages/student/ProgressTracking';
import UserManagement from './pages/instructor/UserManagement';

// ─── Dammika's Pages ───
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CreateCoursePage from './pages/CreateCoursePage';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// ─── Styles ───
import './App.css';
import './styles/auth.css';

// ─── Wrappers for Dinisuru's pages (callback-based navigation → React Router) ───
function LandingWrapper() {
  const navigate = useNavigate();
  return <Landing onGoToPortal={() => navigate('/learning')} />;
}

function LearningWrapper() {
  const navigate = useNavigate();
  return <Learning onBackToLanding={() => navigate('/')} />;
}

function LerningCompleateWrapper() {
  const navigate = useNavigate();
  return <LerningCompleate onBackToLanding={() => navigate('/')} />;
}

function ForumWrapper() {
  const navigate = useNavigate();
  return <Forum onBackToLanding={() => navigate('/')} />;
}

function NotificationsWrapper() {
  const navigate = useNavigate();
  return (
    <Notifications
      onBackToLanding={() => navigate('/')}
      onNavigateToForum={() => navigate('/forum')}
      onNavigateToLearning={() => navigate('/learning')}
    />
  );
}

// ─── Wrappers for Chamindu's auth pages (callback-based navigation → React Router) ───
function LoginWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page) => {
    if (page === 'admin') navigate('/user-management');
    else if (page === 'instructor') navigate('/dashboard');
    else if (page === 'student') navigate('/learning');
    else if (page === 'home') navigate('/');
    else if (page === 'register') navigate('/register');
    else if (page === 'forgot') navigate('/forgot-password');
    else navigate('/login');
  };
  return <Login onNavigate={handleNavigate} />;
}

function RegisterWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page) => {
    if (page === 'admin') navigate('/user-management');
    else if (page === 'instructor') navigate('/dashboard');
    else if (page === 'student') navigate('/learning');
    else if (page === 'home') navigate('/');
    else if (page === 'login') navigate('/login');
    else navigate('/register');
  };
  return <Register onNavigate={handleNavigate} />;
}

function ForgotPasswordWrapper() {
  const navigate = useNavigate();
  const handleNavigate = (page) => {
    if (page === 'login') navigate('/login');
    else navigate('/forgot-password');
  };
  return <ForgotPassword onNavigate={handleNavigate} />;
}

function App() {
  return (
    <Routes>
      {/* ─── Landing / Home ─── */}
      <Route path="/" element={<LandingWrapper />} />

      {/* ─── Auth Routes (Chamindu) ─── */}
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/register" element={<RegisterWrapper />} />
      <Route path="/forgot-password" element={<ForgotPasswordWrapper />} />

      {/* ─── Auth Routes (Dammika - with layout) ─── */}
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      {/* ─── Dashboard Routes (Dammika - with layout) ─── */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/courses/create" element={<CreateCoursePage />} />
      </Route>

      {/* ─── Student Learning (Dinisuru) ─── */}
      <Route path="/learning" element={<LearningWrapper />} />
      <Route path="/learning-complete" element={<LerningCompleateWrapper />} />
      <Route path="/forum" element={<ForumWrapper />} />
      <Route path="/notifications" element={<NotificationsWrapper />} />

      {/* ─── Course (Gihan) ─── */}
      <Route path="/course-list" element={<CourseList />} />

      {/* ─── Student Profile & Progress (Gihan) ─── */}
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/certificates" element={<Certificate />} />
      <Route path="/progress-tracking" element={<ProgressTracking />} />

      {/* ─── Instructor (Chamindu + Gihan) ─── */}
      <Route path="/manage-course" element={<ManageCourse />} />
      <Route path="/upload-material" element={<UploadMaterial />} />
      <Route path="/user-management" element={<UserManagement />} />

      {/* ─── Admin (Chamindu) ─── */}
      <Route path="/admin/payment" element={<AdminPayment />} />

      {/* ─── Communication (Chamindu) ─── */}
      <Route path="/chat" element={<ChatPage />} />

      {/* ─── Catch-all redirect ─── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;