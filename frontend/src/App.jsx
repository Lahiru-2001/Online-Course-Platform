import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import StudentLayout from './layouts/StudentLayout';
import InstructorLayout from './layouts/InstructorLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Landing from './pages/public/Landing';
import CourseListing from './pages/public/CourseListing';
import CourseDetails from './pages/public/CourseDetails';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import Forum from './pages/public/Forum';
import Notifications from './pages/public/Notifications';
import ChatPage from './pages/public/ChatPage';
import CourseContents from './pages/public/CourseContents';

// Protected Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import LearnLesson from './pages/student/LearnLesson';
import LearnCompleted from './pages/student/LearnCompleted';
import Payments from './pages/student/Payments';
import Certificates from './pages/student/Certificates';
import StudentProfile from './pages/student/StudentProfile';
import EditProfile from './pages/student/EditProfile';

// Protected Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import ManageCourses from './pages/instructor/ManageCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import UploadMaterial from './pages/instructor/UploadMaterial';
import Earnings from './pages/instructor/Earnings';
import InstructorProfile from './pages/instructor/InstructorProfile';
import EditCourse from './pages/instructor/EditCourse';

// Protected Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import Reports from './pages/admin/Reports';
import AdminProfile from './pages/admin/AdminProfile';
import AdminPayment from './pages/admin/AdminPayment';

// UI Helpers
import ProtectedRoute from './components/ui/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<CourseListing />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/contents" element={<CourseContents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Student Protected Layout */}
      <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/my-courses" element={<MyCourses />} />
          <Route path="/student/explore" element={<CourseListing />} />
          <Route path="/student/courses/:id" element={<CourseDetails />} />
          <Route path="/student/course/:courseId/learn" element={<LearnLesson />} />
          <Route path="/student/course/:courseId/completed" element={<LearnCompleted />} />
          <Route path="/student/payments" element={<Payments />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/edit-profile" element={<EditProfile />} />
          <Route path="/student/forum" element={<Forum />} />
          {/* <Route path="/student/notifications" element={<Notifications />} /> */}
          <Route path="/student/chat" element={<ChatPage />} />
        </Route>
      </Route>

      {/* Instructor Protected Layout */}
      <Route element={<ProtectedRoute allowedRoles={['Instructor']} />}>
        <Route element={<InstructorLayout />}>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<ManageCourses />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/edit-course/:id" element={<EditCourse />} />
          <Route path="/instructor/upload" element={<UploadMaterial />} />
          <Route path="/instructor/earnings" element={<Earnings />} />
          <Route path="/instructor/reports" element={<Reports />} />
          <Route path="/instructor/profile" element={<InstructorProfile />} />
          <Route path="/instructor/forum" element={<Forum />} />
          {/* <Route path="/instructor/notifications" element={<Notifications />} /> */}
          <Route path="/instructor/chat" element={<ChatPage />} />
        </Route>
      </Route>

      {/* Admin Protected Layout */}
      <Route element={<ProtectedRoute allowedRoles={['Administrator']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/payments" element={<AdminPayment />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/forum" element={<Forum />} />
          {/* <Route path="/admin/notifications" element={<Notifications />} /> */}
          <Route path="/admin/chat" element={<ChatPage />} />
        </Route>
      </Route>

      {/* Catch All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}