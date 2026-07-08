import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, Bell, Settings } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
  const { logout, isAuthenticated, role, user } = useAuth();
  const navigate = useNavigate();

  // Check if current path is a dashboard/portal layout route
  const isDashboardRoute = window.location.pathname.startsWith('/student') || 
                           window.location.pathname.startsWith('/instructor') || 
                           window.location.pathname.startsWith('/admin');

  // Dashboard navbar
  if (isAuthenticated && isDashboardRoute) {
    if (role === 'Student') {
      // Student Top Navbar: Greeting on left, search and bell on right
      return (
        <header className="bg-[#184B65] text-white h-16 px-6 flex items-center justify-between shadow-md relative z-30">
          <div className="flex items-center gap-3">
            {toggleSidebar && (
              <button onClick={toggleSidebar} className="lg:hidden text-white hover:text-orange-400 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                Welcome Back, Student <span className="text-lg">👋</span>
              </h2>
              <p className="text-[10px] text-white/60 font-medium">Continue your learning journey.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs rounded-lg pl-9 pr-4 py-1.5 w-44 md:w-52 focus:bg-white/20 focus:outline-none focus:border-white/40 transition-all"
              />
              <Search className="absolute left-3 w-3.5 h-3.5 text-white/40" />
            </div>

            {/* Bell Icon */}
            <button 
              onClick={() => navigate('/student/notifications')}
              className="relative hover:text-orange-400 transition-colors" 
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            </button>

            {/* Settings Icon */}
            {/* <button 
              onClick={() => navigate('/student/profile')}
              className="hover:text-orange-400 transition-colors" 
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </button> */}

            {/* Avatar circle */}
            {/* <img 
              onClick={() => navigate('/student/profile')}
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-white/20 object-cover cursor-pointer hover:border-orange-400 transition-all"
            /> */}
          </div>
        </header>
      );
    } else {
      // Instructor / Admin Top Navbar matching screenshots 7-12
      // Left: LMS Brand Logo + Horizontal tabs: Dashboard, Courses, Reports, Users
      // Right: Search bar, Bell icon, Gear/Settings, Profile avatar circle
      const baseRoute = role === 'Administrator' ? '/admin' : '/instructor';
      const navLinks = [
        { label: 'Dashboard', path: `${baseRoute}/dashboard` },
        { label: 'Courses', path: `${baseRoute}/courses` },
        { label: 'Reports', path: `${baseRoute}/reports` },
        { label: 'Users', path: role === 'Administrator' ? '/admin/users' : '/instructor/courses' }
      ];

      return (
        <header className="bg-[#184B65] text-white h-16 px-6 flex items-center justify-between shadow-md relative z-30 border-b border-blue-900/20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              {toggleSidebar && (
                <button onClick={toggleSidebar} className="lg:hidden text-white hover:text-orange-400 transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <span onClick={() => navigate(`${baseRoute}/dashboard`)} className="text-lg font-black tracking-wider cursor-pointer">
                LMS
              </span>
            </div>

            {/* Horizontal Tabs */}
            <nav className="hidden md:flex items-center gap-6 h-16 text-xs font-bold">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) => 
                    `h-full flex items-center px-1 border-b-2 transition-all hover:text-orange-400 ${
                      isActive 
                        ? 'border-orange-500 text-orange-400' 
                        : 'border-transparent text-gray-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs rounded-lg pl-9 pr-4 py-1.5 w-44 md:w-52 focus:bg-white/20 focus:outline-none focus:border-white/40 transition-all"
              />
              <Search className="absolute left-3 w-3.5 h-3.5 text-white/40" />
            </div>

            {/* Bell Icon */}
            <button 
              onClick={() => navigate(`${baseRoute}/notifications`)}
              className="relative hover:text-orange-400 transition-colors" 
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            </button>

            {/* Settings Icon */}
            {/* <button 
              onClick={() => navigate(`${baseRoute}/profile`)}
              className="hover:text-orange-400 transition-colors" 
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </button> */}

            {/* Avatar circle */}
            {/* <img 
              onClick={() => navigate(`${baseRoute}/profile`)}
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-white/20 object-cover cursor-pointer hover:border-orange-400 transition-all"
            /> */}
          </div>
        </header>
      );
    }
  }

  // Public navbar (for landing/login/register)
  return (
    <header className="bg-[#184B65] text-white h-16 px-6 flex items-center justify-between shadow-md relative z-30">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-extrabold tracking-wider text-white hover:text-orange-400 transition-colors">
          LMS
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold hover:text-orange-400 transition-colors">
            Home
          </Link>
          <Link to="/courses" className="text-sm font-semibold hover:text-orange-400 transition-colors">
            Courses
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-6">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link 
              to={role === 'Administrator' ? '/admin/dashboard' : role === 'Instructor' ? '/instructor/dashboard' : '/student/dashboard'} 
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold hover:text-orange-400 transition-colors px-3 py-1.5">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
