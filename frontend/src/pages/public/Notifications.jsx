import React, { useState } from 'react';
import { Bell, BookOpen, MessageSquare, Settings, CheckCheck } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { key: 'all', label: 'All Notifications', icon: Bell },
    { key: 'courses', label: 'About Courses', icon: BookOpen },
    { key: 'forum', label: 'Forum Activities', icon: MessageSquare },
    { key: 'system', label: 'System Updates', icon: Settings },
  ];

  const notifications = [
    { type: 'assignment', title: 'New Assignment Published', body: 'Uma Instructor published "Assignment 2: Hydraulic Circuit Simulation" in Industrial Fluid Systems.', time: '10 mins ago', read: false, icon: '📋' },
    { type: 'grade', title: 'Grade Released successfully', body: 'Your submission for "Quiz 1: Fluid Dynamics Basics" has been evaluated. Score: 85% (Grade: A).', time: '15 mins ago', read: false, icon: '🎯' },
    { type: 'forum', title: 'Saman S. Kumar replied to your thread', body: 'Replied on "How to configure hydraulic cylinder simulation coordinates?" in Mechatronics Hub.', time: '10 mins ago', read: false, icon: '💬' },
    { type: 'grade', title: 'Grade Released successfully', body: 'Your submission for "Quiz 1: Fluid Dynamics Basics" has been evaluated. Score: 80% (Grade: A).', time: '15 mins ago', read: false, icon: '🎯' },
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 min-h-screen">
      <h1 className="text-2xl font-bold text-[#1e3a5f]">Notifications Center</h1>

      {/* Tab Filters */}
      <div className="border-b border-gray-200 flex gap-6 text-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 font-semibold transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Cards */}
      <div className="flex flex-col gap-4">
        {notifications.map((n, idx) => (
          <Card key={idx} className={`border p-5 ${n.read ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-start gap-4">
              <span className="text-2xl shrink-0">{n.icon}</span>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800 text-sm">{n.title}</h4>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-4">{n.time}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.body}</p>
                <button className="text-orange-500 text-[10px] font-bold mt-2 hover:underline flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" /> Mark as read
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
