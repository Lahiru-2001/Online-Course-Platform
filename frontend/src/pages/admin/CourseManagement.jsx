import React, { useState } from 'react';
import { MOCK_COURSES } from '../../utils/mockData';
import { Plus, Settings2, Trash } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function CourseManagement() {
  const [courses, setCourses] = useState(MOCK_COURSES.slice(0, 8));
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Delete this course from platform databases?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Course Management</h1>
          <p className="text-sm text-gray-500 mt-1">Audit active curriculum classes, configure parameters and settings</p>
        </div>
        <Button onClick={() => navigate('/admin/create-course')} variant="primary" className="py-2.5 px-5">
          <Plus className="w-4 h-4" /> Create New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col h-full overflow-hidden p-0 border border-gray-200">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{course.category}</span>
                <h3 className="font-bold text-gray-900 mt-1 line-clamp-2 text-sm leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-1 font-mono">ID: {course.id}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Enrolled count</span>
                  <span className="font-bold text-[#1e3a5f]">{course.enrolledCount} active</span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="font-bold text-sm text-gray-900">{course.price}</span>
                  <div className="flex gap-1.5">
                    <Button onClick={() => alert(`Configuring settings for course ${course.id}`)} variant="outline" className="p-2 py-1.5 text-xs">
                      <Settings2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button onClick={() => handleDelete(course.id)} variant="danger" className="p-2 py-1.5 text-xs bg-red-50 text-red-600 border border-red-200 shadow-none hover:bg-red-600 hover:text-white">
                      <Trash className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
