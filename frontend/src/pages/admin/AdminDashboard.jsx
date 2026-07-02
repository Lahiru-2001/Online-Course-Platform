import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Download, Users, BookOpen, AlertCircle, Check, X, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const chartData = [
    { month: 'MAR', amount: 4000000, color: '#d1d5db' },
    { month: 'APR', amount: 6000000, color: '#9ca3af' },
    { month: 'MAY', amount: 9000000, color: '#fdb184' },
    { month: 'JUN', amount: 8000000, color: '#6b8998' },
    { month: 'JUL', amount: 11000000, color: '#3b5c6f' },
    { month: 'AUG', amount: 12450200, color: '#f97316' },
  ];

  const pendingApprovals = [
    { name: 'Prof. Damayanthi Perera', email: 'd.perera@univdomain.lk', exp: 'Physics & Quantum Mechanics', date: 'Aug 24, 2024' },
    { name: 'Mr. Aruna Jayawardena', email: 'aruna.j@tech-edu.com', exp: 'Full Stack Development', date: 'Aug 25, 2024' }
  ];

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Platform Overview</h1>
          <p className="text-xs text-gray-400">Real-time statistics and system performance metrics for LMS Sri Lanka.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Aug 01 - Aug 31, 2024</span>
          </div>
          <Button variant="primary" className="py-2.5 px-4 text-xs font-bold uppercase whitespace-nowrap">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Students</span>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+18%</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">42,850</h2>
        </Card>

        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Instructors</span>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">+4%</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">1,120</h2>
        </Card>

        <Card className="border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Courses</span>
            <span className="text-[10px] text-orange-650 font-bold bg-orange-50 px-2 py-0.5 rounded-full">86 New</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">3,490</h2>
        </Card>

        <Card className="border border-orange-200 bg-orange-55/10 p-5">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Revenue (LKR)</span>
            <span className="text-[10px] text-orange-650 font-bold bg-orange-100/50 px-2 py-0.5 rounded-full">Monthly</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">12,450,200</h2>
        </Card>
      </div>

      {/* Middle section: Chart + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <Card className="lg:col-span-2 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Revenue Trends</h3>
            <select className="px-2 py-1.5 border border-gray-200 text-[10px] rounded-lg font-bold text-gray-500 bg-gray-50 outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '11px' }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={36}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* System Status */}
        <Card className="border border-gray-200 flex flex-col gap-5">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">System Status</h3>
          
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>API Gateway</span>
              </div>
              <span className="text-gray-400">99.9% Uptime</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Video Server</span>
              </div>
              <span className="text-gray-400">Operational</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Database</span>
              </div>
              <span className="text-gray-400">Under Heavy Load</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <span>Storage Usage</span>
                <span>76%</span>
              </div>
              <ProgressBar progress={76} />
              <span className="text-[10px] text-gray-400 mt-1">7.6 TB of 10 TB</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom section: Approvals */}
      <Card className="border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Pending Instructor Approvals</h3>
          <button onClick={() => navigate('/admin/users', { state: { role: 'Instructor' } })} className="text-xs text-orange-500 font-bold hover:underline">View All Applications</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Subject Expertise</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingApprovals.map((app, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{app.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{app.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">{app.exp}</td>
                  <td className="py-3.5 px-4 text-gray-400">{app.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 text-[9px] font-bold bg-orange-55/10 text-orange-600 rounded border border-orange-200">PENDING</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => alert(`Instructor account for ${app.name} approved successfully!`)} className="p-1.5 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded border border-green-200 transition-all" title="Approve">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => alert(`Instructor account for ${app.name} rejected.`)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded border border-red-200 transition-all" title="Reject">
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => alert(`Viewing detailed portfolio/experience context for ${app.name}...`)} className="p-1.5 bg-gray-50 text-gray-500 hover:bg-gray-500 hover:text-white rounded border border-gray-200 transition-all" title="View Portfolio">
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}