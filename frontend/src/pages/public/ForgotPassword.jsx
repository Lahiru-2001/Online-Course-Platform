import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md text-center">
        <div className="w-14 h-14 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 text-left">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold">Send Reset Link</Button>
          </form>
        ) : (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-xs text-green-700 font-medium">
            Reset link sent to <strong>{email}</strong>! Check your inbox.
          </div>
        )}

        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold mt-5 hover:text-orange-500 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </Link>
      </div>
    </div>
  );
}
