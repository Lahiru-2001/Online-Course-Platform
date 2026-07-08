import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

export default function InstructorProfile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('About Portfolio');

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Saman',
    lastName: user?.name?.split(' ')[1] || 'Perera',
    email: user?.email || 'saman@uni.lk',
    phone: '+94 71 889 1290',
    specialization: 'Full-Stack Development & Python Automation',
    bio: 'Senior academic researcher and software consultant with 10+ years teaching web platforms and deployment workflows.',
    expertise: ['React', 'Python', 'UI/UX Dynamics', 'Mechatronics'],
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      avatar: formData.avatar
    }));
    setIsEditing(false);
    alert('Instructor profile portfolio updated successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: url }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top Header Card */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-green-500/10 object-cover" />
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="text-2xl font-bold text-[#1e3a5f]">{formData.firstName} {formData.lastName}</h2>
              <Badge variant="green">Instructor</Badge>
            </div>
            <p className="text-sm font-semibold text-orange-500 mt-1">{formData.specialization}</p>
            <p className="text-xs text-gray-400">{formData.email}</p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant="primary" className="py-2.5 px-5">
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Students</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">1,248</h2>
        </Card>
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Courses Created</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">8</h2>
        </Card>
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Avg Rating</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">4.8 ★</h2>
        </Card>
      </div>

      {/* Tab Select */}
      <div className="border-b border-gray-200 flex gap-6 text-sm">
        {['About Portfolio', 'Expertise Tags', 'Reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content / Edit Form */}
      {isEditing ? (
        <Card>
          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Specialization / Title"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Professional Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Upload new picture</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            </div>

            <Button type="submit" variant="primary" className="py-3 mt-2">
              Update Profile
            </Button>
          </form>
        </Card>
      ) : (
        <Card>
          {activeTab === 'About Portfolio' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1e3a5f] text-base">Professional Bio</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{formData.bio}</p>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-2 text-sm">
                <div>
                  <span className="text-xs text-gray-400 font-semibold block uppercase">Phone Contact</span>
                  <span className="font-medium text-gray-800">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block uppercase">Accredited Specialization</span>
                  <span className="font-medium text-gray-800">Lecturer / Senior Advisor</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Expertise Tags' && (
            <div>
              <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-4">Domain Skills Portfolio</h3>
              <div className="flex flex-wrap gap-2.5">
                {formData.expertise.map((tag) => (
                  <span key={tag} className="px-3.5 py-2 bg-green-50 text-green-800 text-xs font-bold rounded-lg border border-green-200 shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-800">Kasun P. (Student u4)</span>
                  <span className="text-orange-500">★★★★★ 5.0</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Excellent mechatronics syllabus. Lectures cover clean setup details and direct deployment cycles.
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
