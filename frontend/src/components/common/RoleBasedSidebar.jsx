import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  CreditCard,
  User,
  UploadCloud,
  Wallet,
  Shield,
  BarChart3,
  LogOut,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  Plus,
  Compass,
  MessageCircle
} from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function RoleBasedSidebar({ isOpen, closeSidebar }) {
  const { role, logout, user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const [studentProfile, setStudentProfile] = useState({
    fullName: "",
    profileImage: "",
  });

  const token = localStorage.getItem("token");

  const loadStudentProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/student/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudentProfile({
        fullName: res.data.student.fullName,
        profileImage: res.data.student.profileImage,
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (role === "Student") {
      loadStudentProfile();
    }
  }, [role]);

  const studentLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/student/my-courses', icon: BookOpen },
    { label: 'Explore Courses', path: '/student/explore', icon: Compass },
    { label: 'Payment Review', path: '/student/payments', icon: CreditCard },
    { label: 'Certificates', path: '/student/certificates', icon: Award },
    // { label: 'Forum', path: '/student/forum', icon: Shield },
    { label: 'Chat', path: '/student/chat', icon: Wallet },
  ];

  const instructorLinks = [
    {
      label: "Overview",
      path: "/instructor/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Courses",
      path: "/instructor/courses",
      icon: BookOpen,
    },
    {
      label: "Earnings",
      path: "/instructor/earnings",
      icon: Wallet,
    },
    {
      label: "Reports",
      path: "/instructor/reports",
      icon: BarChart3,
    },
    {
      label: "Chat",
      path: "/instructor/chat",
      icon: MessageCircle,
    },
    {
      label: "Profile",
      path: "/instructor/profile",
      icon: User,
    },
  ];

  const adminLinks = [
    {
      label: "Overview",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Course Management",
      path: "/admin/courses",
      icon: BookOpen,
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: Shield,
    },
    {
      label: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      label: "Chat",
      path: "/admin/chat",
      icon: MessageCircle,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: User,
    },
  ];

  const links =
    role === "Administrator"
      ? adminLinks
      : role === "Instructor"
        ? instructorLinks
        : studentLinks;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-gray-800 border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-150">
        <h3 className="text-xl font-bold tracking-tight text-[#1e3a5f]">
          {role === 'Student' ? 'DashBoard' : 'LMS Admin'}
        </h3>
        <p className="text-xs text-gray-400 capitalize font-medium mt-0.5">
          {role === 'Student' ? 'Student Portal' : 'Instructor Portal'}
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-gray-650 hover:bg-gray-100 hover:text-[#1e3a5f]'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}

        {/* Create Course button for Instructor/Admin */}
        {(role === "Instructor") && (
          <div className="pt-4 px-2">
            <Button
              onClick={() => {
                closeSidebar();
                navigate(role === 'Administrator' ? '/admin/create-course' : '/instructor/create-course');
              }}
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] uppercase font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" /> Create New Course
            </Button>
          </div>
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100 relative">
        {(role === 'Instructor' || role === 'Administrator') ? (
          <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-500">
            {/* <button className="flex items-center gap-2 hover:text-orange-500 text-left pl-2">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button> */}
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-left pl-2">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        ) : (
          <div>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    studentProfile.profileImage
                      ? `http://localhost:5000${studentProfile.profileImage}`
                      : "http://localhost:5000/uploads/images/default-profile.png"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800 truncate max-w-[110px]">{studentProfile.fullName || "Student"}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{role}</p>
                </div>
              </div>
              {showDropdown ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>

            {showDropdown && (
              <div className="absolute bottom-16 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 divide-y divide-gray-100 animate-slide-up">
                <Link
                  to="/student/profile"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <button
                  onClick={() => { setShowDropdown(false); logout(); navigate('/'); }}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-650 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0 relative z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Slide-out Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSidebar}></div>
          <div className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-2xl transition-transform duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
