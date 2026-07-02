import React, { useState } from 'react';
import { Calendar, Download, Users, CheckSquare, BarChart3, Sliders, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function Reports() {
  const students = [
    { name: 'Amara Silva', id: 'ID-42465-ST', path: 'Advanced UI/UX Design', progress: 92, score: '94/100', status: 'On Track', color: 'bg-green-50 text-green-700 border-green-200' },
    { name: 'Kasun Perera', id: 'ID-45411-ST', path: 'Web Development Bootcamp', progress: 45, score: '62/100', status: 'At Risk', color: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Ruwan Fernando', id: 'ID-32415-ST', path: 'Data Science with Python', progress: 100, score: '98/100', status: 'Completed', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Nethmi Kumari', id: 'ID-42423-ST', path: 'Mobile App Development', progress: 72, score: '88/100', status: 'On Track', color: 'bg-green-50 text-green-700 border-green-200' }
  ];

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Student Progress Tracking</h1>
          <p className="text-xs text-gray-400">Comprehensive performance analytics for your active courses.</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" className="py-2 px-4 text-xs font-bold border-gray-300 text-gray-700 hover:bg-gray-50 shadow-none flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-gray-400" /> Filters
          </Button>
          <Button variant="primary" className="py-2.5 px-4 text-xs font-bold uppercase whitespace-nowrap">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Average Completion Rate</span>
            <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-1">78.4%</h2>
            <div className="mt-2">
              <ProgressBar progress={78.4} />
            </div>
          </div>
          <span className="text-[9px] text-green-600 font-bold mt-2 inline-block">+5.2% from last month</span>
        </Card>

        <Card className="border border-gray-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#1e3a5f] rounded-lg shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Active Students</span>
            <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-0.5">1,248</h2>
            <span className="text-[9px] text-gray-400">Active Students</span>
          </div>
        </Card>

        <Card className="border border-gray-200 p-5 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase block">Quiz Pass Rate</span>
            <h2 className="text-2xl font-extrabold text-[#1e3a5f] mt-0.5">85%</h2>
            <span className="text-[9px] text-gray-400">Quiz Pass Rate</span>
          </div>
        </Card>

        <Card className="border border-gray-200 p-5 flex flex-col justify-between">
          <span className="text-[9px] text-gray-400 font-bold uppercase block mb-2">Learning Engagement</span>
          <div className="flex items-end gap-1.5 h-16 justify-center">
            {[20, 45, 30, 60, 50, 35].map((val, idx) => (
              <div 
                key={idx} 
                className={`w-3.5 rounded-t-sm transition-all ${idx === 4 ? 'bg-orange-500' : 'bg-gray-200'}`} 
                style={{ height: `${val}%` }}
              ></div>
            ))}
          </div>
          <span className="text-[9px] text-gray-400 text-center font-bold uppercase block mt-2">Hours Spent per Course</span>
        </Card>
      </div>

      {/* Student Registry Table */}
      <Card className="border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Student Performance Registry</h3>
          <span className="text-[10px] text-gray-400">All Course pathways</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Course Pathway</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Avg. Quiz Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((st, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div>
                      <h4 className="font-bold text-gray-800">{st.name}</h4>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">{st.id}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">{st.path}</td>
                  <td className="py-3.5 px-4 w-44">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow">
                        <ProgressBar progress={st.progress} />
                      </div>
                      <span className="font-bold text-gray-800 shrink-0">{st.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{st.score}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded border uppercase ${st.color}`}>
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-orange-500 text-xs font-bold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grid: Course Success Rates + Actions Required */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Success Rates */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-5">Course Success Rates</h3>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Graphic Design 101', rate: 94 },
              { name: 'Introduction to React', rate: 76 },
              { name: 'Digital Marketing Essentials', rate: 58 }
            ].map((course, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{course.name}</span>
                  <span className="text-orange-500">{course.rate}% Success</span>
                </div>
                <div className="h-2 bg-gray-150 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1e3a5f] rounded-full" style={{ width: `${course.rate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Required alerts */}
        <Card className="border border-gray-200 flex flex-col gap-4">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-2">Action Required</h3>
          
          <div className="flex gap-3.5 items-start p-4 bg-red-50/50 border border-red-100 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-800 text-xs">Quiz Fail Failure Spike</h4>
              <p className="text-[11px] text-gray-500 mt-1">32% failure rate in "UI Foundations". Recommend review.</p>
              <button className="text-[10px] text-orange-500 font-bold hover:underline mt-2 inline-block">View Quiz Analytics</button>
            </div>
          </div>

          <div className="flex gap-3.5 items-start p-4 bg-orange-50/40 border border-orange-100 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-800 text-xs">24 Pending Assignments</h4>
              <p className="text-[11px] text-gray-500 mt-1">New submissions ready for grading in "Web Security".</p>
              <button className="text-[10px] text-orange-500 font-bold hover:underline mt-2 inline-block">Open Gradebook</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
