import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, BarChart3, RotateCcw, FileSpreadsheet, Plus, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function ManageCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([
    { id: 1, title: 'Advanced Web Systems Architecture', students: '1,240', rating: '4.8', status: 'PUBLISHED', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' },
    { id: 2, title: 'Strategic Enterprise Management', students: '0', rating: 'N/A', status: 'DRAFT', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500' },
    { id: 3, title: 'Quantum Physics for Beginners', students: '850', rating: '4.5', status: 'PUBLISHED', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500' },
    { id: 4, title: 'Interpersonal Skills (V1.0)', students: '3.2k', rating: '4.2', status: 'ARCHIVED', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500' }
  ]);

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Course Management</h1>
          <p className="text-xs text-gray-400">Organize, track, and update your educational content.</p>
        </div>
        <Button onClick={() => navigate('/instructor/create-course')} variant="primary" className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider">
          <Plus className="w-4 h-4" /> Create New Course
        </Button>
      </div>

      {/* Filter toolbar */}
      <Card className="flex flex-col sm:flex-row gap-4 items-center justify-between border border-gray-200 shadow-sm p-4">
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 font-bold text-gray-700 outline-none">
            <option>All Statuses</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
          <select className="px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 font-bold text-gray-700 outline-none">
            <option>All Categories</option>
            <option>Engineering</option>
            <option>Management</option>
            <option>Physics</option>
          </select>
        </div>
      </Card>

      {/* Grid of Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col h-full justify-between p-0 overflow-hidden border border-gray-200 shadow-sm rounded-xl">
            <div className="relative">
              <img src={course.img} alt={course.title} className="w-full h-44 object-cover" />
              <span className={`absolute top-3 left-3 text-[8px] font-black tracking-widest px-2.5 py-1 rounded shadow-sm ${
                course.status === 'PUBLISHED' 
                  ? 'bg-green-500 text-white' 
                  : course.status === 'DRAFT' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-500 text-white'
              }`}>
                {course.status}
              </span>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-[#1e3a5f] text-sm leading-snug line-clamp-2 min-h-[40px]">{course.title}</h3>
                
                <div className="flex gap-4 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <div>
                    <span>Students</span>
                    <p className="text-gray-800 text-xs font-black mt-0.5">{course.students}</p>
                  </div>
                  <div>
                    <span>Rating</span>
                    <p className="text-gray-800 text-xs font-black mt-0.5">{course.rating}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons row */}
              <div className="mt-6 pt-4 border-t border-gray-150 flex gap-2">
                {course.status === 'PUBLISHED' && (
                  <>
                    <Button onClick={() => navigate('/instructor/upload')} className="flex-1 py-1.5 px-3 text-[10px] uppercase font-bold bg-[#1e3a5f] text-white hover:bg-blue-900">
                      <Pencil className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="outline" className="py-1.5 px-3 text-[10px] uppercase font-bold border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none">
                      <BarChart3 className="w-3.5 h-3.5" /> Data
                    </Button>
                    <Button onClick={() => { if(window.confirm('Archive this published course?')) setCourses(courses.filter(c => c.id !== course.id)) }} variant="outline" className="py-1.5 px-3 text-[10px] uppercase font-bold border-red-200 text-red-650 hover:bg-red-50 hover:text-red-700 shadow-none">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </>
                )}

                {course.status === 'DRAFT' && (
                  <>
                    <Button onClick={() => navigate('/instructor/create-course')} className="flex-grow py-1.5 px-3 text-[10px] uppercase font-bold bg-orange-500 hover:bg-orange-600">
                      Resume Editing
                    </Button>
                    <Button onClick={() => { if(window.confirm('Delete this course draft?')) setCourses(courses.filter(c => c.id !== course.id)) }} variant="outline" className="py-1.5 px-3 text-[10px] uppercase font-bold border-red-200 text-red-650 hover:bg-red-50 hover:text-red-700 shadow-none">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </>
                )}

                {course.status === 'ARCHIVED' && (
                  <>
                    <Button variant="outline" className="flex-1 py-1.5 px-3 text-[10px] uppercase font-bold border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none">
                      <RotateCcw className="w-3 h-3" /> Restore
                    </Button>
                    <Button variant="outline" className="flex-1 py-1.5 px-3 text-[10px] uppercase font-bold border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none">
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Report
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
