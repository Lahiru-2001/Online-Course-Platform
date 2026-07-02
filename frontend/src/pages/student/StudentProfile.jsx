import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Award, LogOut } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function StudentProfile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('about');

  const profileData = {
    name: user?.name || 'Alex Carter',
    role: 'Student • Computer Science',
    bio: 'Passionate learner focusing on web development and UI/UX design. Always eager to build user-centric applications and expand my technical skill set.',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    email: 'alex.carter@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joined: 'September 2024',
    enrolled: 12,
    completed: 4,
    certificates: 3,
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#1e3a5f]">Profile Overview</h1>
        <Link to="/student/edit-profile">
          <Button variant="primary" className="py-2 px-5 text-xs font-bold uppercase">Edit Profile</Button>
        </Link>
      </div>

      {/* Avatar + Info Card */}
      <Card className="flex flex-col items-center text-center border border-gray-200 py-8">
        <img src={profileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover" />
        <h2 className="text-xl font-bold text-[#1e3a5f] mt-4">{profileData.name}</h2>
        <p className="text-xs text-orange-500 font-bold mt-1">{profileData.role}</p>
        <p className="text-xs text-gray-500 mt-2 max-w-md leading-relaxed">{profileData.bio}</p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="text-center border border-gray-200 p-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Enrolled Courses</p>
          <h2 className="text-3xl font-extrabold text-orange-500 mt-1">{profileData.enrolled}</h2>
        </Card>
        <Card className="text-center border border-gray-200 p-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed Courses</p>
          <h2 className="text-3xl font-extrabold text-orange-500 mt-1">{profileData.completed}</h2>
        </Card>
        <Card className="text-center border border-gray-200 p-6">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Certificates Earned</p>
          <h2 className="text-3xl font-extrabold text-orange-500 mt-1">{profileData.certificates}</h2>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-6 text-sm">
        {[
          { key: 'about', label: 'About Me' },
          { key: 'activity', label: 'Recent Activity' },
          { key: 'reviews', label: 'Reviews' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === tab.key ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="border border-gray-200">
        {activeTab === 'about' && (
          <div>
            <h3 className="font-bold text-[#1e3a5f] text-sm mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Email</span>
                <p className="text-gray-800 font-medium mt-0.5">{profileData.email}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Phone</span>
                <p className="text-gray-800 font-medium mt-0.5">{profileData.phone}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Location</span>
                <p className="text-gray-800 font-medium mt-0.5">{profileData.location}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Joined</span>
                <p className="text-gray-800 font-medium mt-0.5">{profileData.joined}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'activity' && (
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between">
              <span>Completed "UI/UX Design Fundamentals" quiz</span>
              <span className="text-gray-400">2 hours ago</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between">
              <span>Enrolled in "Advanced React Architecture"</span>
              <span className="text-gray-400">1 day ago</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between">
              <span>Downloaded Certificate for "G.C.E. A/L ICT"</span>
              <span className="text-gray-400">3 days ago</span>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <p className="text-xs text-gray-400 text-center py-8">No reviews written yet.</p>
        )}
      </Card>
    </div>
  );
}
