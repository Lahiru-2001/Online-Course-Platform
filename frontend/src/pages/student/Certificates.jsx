import React, { useState } from 'react';
import { Award, BookOpen, Clock, Calendar, Download, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import { Link } from 'react-router-dom';

export default function Certificates() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { key: 'all', label: 'All Certificates (5)' },
    { key: 'completed', label: 'Completed (5)' },
    { key: 'progress', label: 'In Progress' },
  ];

  const completedCerts = [
    { id: 'CERT-0001', title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', date: 'Completed on 30 Apr 2026' },
    { id: 'CERT-0002', title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', date: 'Completed on 30 Apr 2026' },
    { id: 'CERT-0003', title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', date: 'Completed on 30 Apr 2026' },
    { id: 'CERT-0004', title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', date: 'Completed on 23 Apr 2026' },
    { id: 'CERT-0005', title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', date: 'Completed on 20 Apr 2026' },
  ];

  const inProgressCerts = [
    { title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', progress: 40, estimated: '22 Jun 2026' },
    { title: 'G.C.E. A/L ICT - Masterclass 2024', university: 'University of Moratuwa', progress: 40, estimated: '22 Jun 2026' },
  ];

  const filtered = activeTab === 'progress' ? [] : completedCerts;

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Certificates</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">17</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed Courses</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">5</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">In Progress</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">7</h3>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border border-gray-200 p-5 rounded-xl">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Member Since</p>
            <h3 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5">Jan 2024</h3>
          </div>
        </Card>
      </div>

      {/* Tab Filters */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-[#1e3a5f] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Completed Certificates */}
      {activeTab !== 'progress' && (
        <div className="flex flex-col gap-4">
          {filtered.map((cert, idx) => (
            <Card key={idx} className="flex flex-col sm:flex-row items-center gap-5 border border-gray-200 p-5">
              {/* Certificate Thumbnail */}
              <div className="w-28 h-20 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg flex items-center justify-center shrink-0">
                <Award className="w-10 h-10 text-orange-500" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-[#1e3a5f] text-sm">{cert.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{cert.university}</p>
                <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase">Completed</span>
                  <span className="text-[10px] text-gray-400">{cert.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Button variant="primary" className="py-2 px-4 text-[10px] font-bold uppercase">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
                <span className="text-[9px] text-gray-400 font-mono">Certificate ID: {cert.id}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Certificates In Progress */}
      {(activeTab === 'all' || activeTab === 'progress') && (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#1e3a5f] text-base mt-2">Certificates In Progress</h3>
          {inProgressCerts.map((cert, idx) => (
            <Card key={idx} className="border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1e3a5f] text-sm">{cert.title}</h3>
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-green-100 text-green-700 rounded uppercase">In Progress</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{cert.university}</p>
                </div>
                <Link to="/student/my-courses">
                  <Button variant="primary" className="py-2 px-4 text-[10px] font-bold uppercase whitespace-nowrap">
                    Continue Learning
                  </Button>
                </Link>
              </div>
              <div className="mt-4">
                <ProgressBar progress={cert.progress} />
                <div className="flex justify-between items-center mt-2 text-[10px]">
                  <span className="text-gray-500">{cert.progress}% Completed</span>
                  <span className="text-gray-400">Estimated completion: {cert.estimated}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
