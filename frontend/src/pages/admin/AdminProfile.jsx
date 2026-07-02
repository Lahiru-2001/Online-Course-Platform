import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS, MOCK_COURSES } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

export default function AdminProfile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Settings');

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailAlerts: false,
  });

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Ayubowan',
    lastName: user?.name?.split(' ')[1] || 'Admin',
    email: user?.email || 'admin@lms.com',
    phone: '+94 11 234 5678',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'
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
    alert('Administrator system profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top Header Card */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-gray-500/10 object-cover" />
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="text-2xl font-bold text-[#1e3a5f]">{formData.firstName} {formData.lastName}</h2>
              <Badge variant="gray">Administrator</Badge>
            </div>
            <p className="text-xs text-gray-400 mt-1">{formData.email}</p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant="primary" className="py-2.5 px-5">
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Users Managed</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{MOCK_USERS.length}</h2>
        </Card>
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Platform Revenue</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">LKR 1.25M</h2>
        </Card>
        <Card className="text-center">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Courses</span>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">{MOCK_COURSES.length}</h2>
        </Card>
      </div>

      {/* Active Tab options */}
      <div className="border-b border-gray-200 flex gap-6 text-sm">
        {['Settings', 'Recent Activity Log'].map((tab) => (
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
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <Button type="submit" variant="primary" className="py-3 mt-2">
              Update Profile
            </Button>
          </form>
        </Card>
      ) : (
        <Card>
          {activeTab === 'Settings' && (
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-[#1e3a5f] text-base border-b border-gray-100 pb-3">Security & Parameters Config</h3>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">2-Factor Authentication</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Enforce high-security OTP login verification</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToggles({ ...toggles, twoFactor: !toggles.twoFactor })}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                    toggles.twoFactor ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    toggles.twoFactor ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">System Email Alerts</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Receive server and registration activity notifications</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToggles({ ...toggles, emailAlerts: !toggles.emailAlerts })}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                    toggles.emailAlerts ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    toggles.emailAlerts ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Recent Activity Log' && (
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between">
                <span>Deleted Course "c12" from portal registry</span>
                <span className="text-gray-400">10 mins ago</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between">
                <span>Approved registration request: BOC Bank Payouts</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
