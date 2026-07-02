import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Wallet, CreditCard, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const ongoingCourses = [
    { title: 'Advanced React Architecture for Sri Lankan Fintech', enrolled: 425, progress: 78, earnings: 'LKR 125,000' },
    { title: 'G.C.E. A/L ICT - Masterclass 2024', enrolled: 312, progress: 85, earnings: 'LKR 210,500' },
    { title: 'English for IT Professionals - Level 01', enrolled: 112, progress: 92, earnings: 'LKR 65,000' },
  ];

  const enrollments = [
    { name: 'Sithumini Perera', course: 'ICT Masterclass 2024', price: 'LKR 3,500', time: '2 mins ago', img: 'https://i.pravatar.cc/32?img=5' },
    { name: 'Kasun Jayawardena', course: 'Advanced React Architecture', price: 'LKR 5,000', time: '10 mins ago', img: 'https://i.pravatar.cc/32?img=6' },
    { name: 'Dilini Danasekara', course: 'English for IT Professionals', price: 'LKR 1,500', time: '1 hour ago', img: 'https://i.pravatar.cc/32?img=7' },
    { name: 'Arjun Silva', course: 'ICT Masterclass 2024', price: 'LKR 3,500', time: '3 hours ago', img: 'https://i.pravatar.cc/32?img=8' },
  ];

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Ayubowan, Professor Perera</h1>
          <p className="text-xs text-gray-400">Here's what's happening with your courses today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Live Server: Colombo 01
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Students</span>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">1,248</h2>
          <p className="text-[10px] text-gray-400 mt-1">Active learners across 8 courses</p>
        </Card>

        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Courses</span>
            <span className="text-[10px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Live</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">08</h2>
          <p className="text-[10px] text-gray-400 mt-1">2 courses pending approval</p>
        </Card>

        <Card className="border border-orange-200 bg-orange-50/15 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Total Earnings</span>
            <span className="text-[10px] text-orange-600 font-bold bg-orange-100/50 px-2 py-0.5 rounded-full">LKR</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">LKR 386,383</h2>
          <p className="text-[10px] text-gray-400 mt-1">This month: +LKR 52,400</p>
        </Card>
      </div>

      {/* Course Progress + Recent Enrollments grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Course Progress summary */}
        <Card className="lg:col-span-2 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Course Progress Summary</h3>
            <button onClick={() => navigate('/instructor/courses')} className="text-xs text-orange-500 font-bold hover:underline">View All Courses</button>
          </div>

          <div className="flex flex-col gap-6">
            {ongoingCourses.map((c, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span className="truncate max-w-[70%]">{c.title}</span>
                  <span className="text-gray-400 font-medium">{c.progress}% Completion</span>
                </div>
                <ProgressBar progress={c.progress} />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{c.enrolled} Students Enrolled</span>
                  <span className="font-bold text-green-600">{c.earnings} Earned</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Enrollments */}
        <Card className="border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-6">Recent Enrollments</h3>
            <div className="flex flex-col gap-4">
              {enrollments.map((enr, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <img src={enr.img} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div className="text-left">
                      <span className="font-bold text-gray-800">{enr.name}</span>
                      <p className="text-[10px] text-gray-400">{enr.course}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-orange-500">{enr.price}</span>
                    <p className="text-[9px] text-gray-400 font-mono">{enr.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <Button variant="outline" className="w-full py-2 text-xs font-bold uppercase">
              View Full History <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
