import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Alex',
    lastName: user?.name?.split(' ')[1] || 'Carter',
    email: user?.email || 'alex.carter@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate learner focusing on web development and UI/UX design. Always eager to build user-centric applications and expand my technical skill set.',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
    }));
    alert('Profile updated successfully!');
    navigate('/student/profile');
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/student/profile')} className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Edit Profile</h1>
        </div>
        <Button onClick={handleSubmit} variant="primary" className="py-2 px-5 text-xs font-bold uppercase">Save Changes</Button>
      </div>

      <Card className="border border-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-gray-200 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-gray-800">Upload new picture</p>
              <p className="text-[10px] text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
            <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">About Me (Bio)</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full h-28 p-3.5 border border-gray-300 rounded-lg text-sm bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 outline-none resize-none"
            />
          </div>

          <Button type="submit" variant="primary" className="py-3 w-48">Update Profile</Button>
        </form>
      </Card>
    </div>
  );
}
