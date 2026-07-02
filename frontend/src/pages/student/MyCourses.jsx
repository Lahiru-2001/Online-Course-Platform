import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      title: 'Automation with Python',
      university: 'University of Moratuwa',
      enrolled: '2026.06.15',
      progress: 100,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'
    },
    {
      id: 2,
      title: 'Automation with Python',
      university: 'University of Moratuwa',
      enrolled: '2026.06.15',
      progress: 78,
      status: 'On Track',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'
    },
    {
      id: 3,
      title: 'Automation with Python',
      university: 'University of Moratuwa',
      enrolled: '2026.06.15',
      progress: 45,
      status: 'On Track',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'
    },
    {
      id: 4,
      title: 'Automation with Python',
      university: 'University of Moratuwa',
      enrolled: '2026.06.15',
      progress: 100,
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500'
    }
  ];

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-[#1e3a5f]">My Courses</h1>
        <p className="text-xs text-gray-400">Access all your active enrolled academic courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden p-0 border border-gray-200 shadow-sm rounded-xl">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-[#1e3a5f] text-base leading-snug">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <span className="font-semibold text-gray-700">{course.university}</span>
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase shrink-0 ${
                  course.status === 'Completed' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {course.status}
                </span>
              </div>

              <div className="text-xs text-gray-400 font-medium">
                Enrolled:{course.enrolled}
              </div>

              <div className="flex flex-col gap-2">
                <ProgressBar progress={course.progress} />
              </div>

              <div className="flex justify-end mt-2">
                {course.status === 'Completed' ? (
                  <Link to={`/student/course/${course.id}/completed`}>
                    <Button className="py-2 px-6 text-xs uppercase font-bold">
                      View
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/student/course/${course.id}/learn`}>
                    <Button className="py-2 px-6 text-xs uppercase font-bold">
                      Continue
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}