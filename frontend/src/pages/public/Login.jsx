import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../utils/mockData';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const pass = password.trim().toLowerCase();
    let foundUser = null;
    if (pass === 'admin') foundUser = MOCK_USERS.find(u => u.role === 'admin');
    else if (pass === 'instructor') foundUser = MOCK_USERS.find(u => u.role === 'instructor');
    else if (pass === 'student') foundUser = MOCK_USERS.find(u => u.role === 'student');
    else foundUser = MOCK_USERS.find(u => u.email === email.trim().toLowerCase());

    if (foundUser) {
      login(foundUser);
      navigate(`/${foundUser.role}/dashboard`);
    } else {
      setError('Invalid credentials. Hint: enter "student", "instructor", or "admin" as the password.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#1e3a5f] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center px-12">
          <h1 className="text-5xl font-black text-white tracking-wider">FUCHSIUS</h1>
          <p className="text-white/70 text-sm mt-3 font-medium">Empowering education through seamless online learning.</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Please enter your details to sign in.</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg border-l-4 border-red-500 mt-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="accent-orange-500 w-3.5 h-3.5" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-orange-500 font-bold hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold">Sign In</Button>

            <button type="button" className="w-full py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don't have an account? <Link to="/register" className="text-orange-500 font-bold hover:underline">Sign up</Link>
          </p>

          <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-3 text-[11px] text-orange-700 leading-relaxed mt-4">
            <strong>Testing:</strong> Password = <strong>student</strong> / <strong>instructor</strong> / <strong>admin</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
