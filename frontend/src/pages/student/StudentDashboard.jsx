import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StudentDashboard() {
  const chartData = [
    { month: 'MAR', hours: 40, color: '#d1d5db' },
    { month: 'APR', hours: 55, color: '#9ca3af' },
    { month: 'MAY', hours: 75, color: '#fdb184' },
    { month: 'JUN', hours: 65, color: '#6b8998' },
    { month: 'JUL', hours: 85, color: '#3b5c6f' },
    { month: 'AUG', hours: 95, color: '#f97316' },
  ];

  const ongoingCourses = [
    { title: 'Advanced React Architecture for Sri Lankan Fintech', progress: 78 },
    { title: 'G.C.E. A/L ICT - Masterclass 2024', progress: 45 },
    { title: 'English for IT Professionals - Level 01', progress: 92 },
    { title: 'English for IT Professionals - Level 01', progress: 92 },
  ];

  const deadlines = [
    { title: 'Advanced React Architecture for Sri Lankan Fintech', date: '2026.05.30' },
    { title: 'G.C.E. A/L ICT - Masterclass 2024', date: '2026.05.30' },
    { title: 'English for IT Professionals - Level 01', date: '2026.05.30' },
    { title: 'English for IT Professionals - Level 01', date: '2026.05.30' },
  ];

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Enrolled Courses</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">17</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed Courses</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">07</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ongoing Courses</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">07</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border border-gray-200/80 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Certificates Earned</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">17</h3>
          </div>
        </Card>
      </div>

      {/* Middle Grid: Progress + Monthly Learning Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200/80">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider">Course Progress Summary</h3>
            <Link to="/student/my-courses" className="text-xs text-orange-500 font-bold hover:underline">
              View All Courses
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {ongoingCourses.map((c, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#1e3a5f] truncate max-w-[75%]">{c.title}</span>
                  <span className="text-gray-400 font-medium">{c.progress}% Completion</span>
                </div>
                <ProgressBar progress={c.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-gray-200/80">
          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6">Monthly Learning Progress</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`${value} Hours`, 'Hours Learnt']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '11px' }} />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={36}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Grid: Deadlines + Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200/80">
          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-6">Upcoming Deadlines</h3>
          <div className="flex flex-col gap-4">
            {deadlines.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs py-1 border-b border-gray-50 last:border-0 pb-2">
                <span className="font-bold text-gray-700 truncate max-w-[70%]">{item.title}</span>
                <span className="text-gray-400 font-mono shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-center items-center text-center p-8 border border-gray-200/80">
          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider mb-4">Total Learning Hours</h3>
          <div className="text-7xl md:text-8xl font-black text-[#1e3a5f] tracking-tighter">
            120
          </div>
        </Card>
      </div>
    </div>
  );
}
