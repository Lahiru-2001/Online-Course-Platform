import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">Sign up to access thousands of courses.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Full Name</label>
              <input type="text" placeholder="John Doe" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500" required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
              <input type="email" placeholder="john@example.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500" required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 pr-11" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500" required />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold">Sign Up</Button>

            <button type="button" className="w-full py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="text-orange-500 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#1e3a5f] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center px-12">
          <h1 className="text-5xl font-black text-white tracking-wider">FUCHSIUS</h1>
          <p className="text-white/70 text-sm mt-3 font-medium">Join our community and start learning today.</p>
        </div>
      </div>
    </div>
  );
}
