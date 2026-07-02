import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function CourseListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    'Computer Science', 'Business Study', 'Data Science', 'Information Technology',
    'Health', 'Maths and logic', 'Language Learning', 'Physical Science & Engendering', 'Personal development'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advance'];

  const durations = [
    'less than 2 hour', 'less than 2 weeks', 'less than 3 month', 'less than 1 year', 'more than 1 year'
  ];

  const courses = [
    { id: 1, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'University of Moratuwa', duration: '3 month', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500' },
    { id: 2, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'Google', duration: '6 month', price: 'LKR 2500', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500' },
    { id: 3, title: 'Google IT Automation with Python', org: 'University of Kelaniya', duration: '1 year', price: 'LKR 1500', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500' },
    { id: 4, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'Google', duration: '3 month', price: 'LKR 3000', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500' },
    { id: 5, title: 'AI for day today life and industry level for all', org: 'University of Moratuwa', duration: '3 month', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500' },
    { id: 6, title: 'Learning motivation', org: 'Company', duration: '2 month', price: 'LKR 2500', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500' },
    { id: 7, title: 'Image Segmentation, Filtering, and Region Analysis', org: 'University', duration: '3 hours', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500' },
    { id: 8, title: 'Web Development with vite code', org: 'Open-AI', duration: '2 Weeks', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' },
    { id: 9, title: 'Industrial Fluid systems & Smart Factory Automation', org: 'University of Moratuwa', duration: '3 month', price: 'LKR 3500', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500' }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
      {/* Left sidebar filters */}
      <div className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <SlidersHorizontal className="w-4.5 h-4.5 text-gray-500" />
          <h3 className="text-sm font-bold text-gray-800">Filters</h3>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Category</h4>
          <div className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-orange-500 w-3.5 h-3.5" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Level</h4>
          <div className="flex flex-col gap-2">
            {levels.map((lvl, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input type="radio" name="level" className="accent-orange-500 w-3.5 h-3.5" />
                <span>{lvl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Duration</h4>
          <div className="flex flex-col gap-2">
            {durations.map((dur, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-orange-500 w-3.5 h-3.5" />
                <span>{dur}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 mb-2">Price</h4>
          <input type="range" min="0" max="10000" className="w-full accent-orange-500" />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Free</span>
            <span>$10100</span>
          </div>
        </div>
      </div>

      {/* Right panel: Course listing */}
      <div className="flex-grow flex flex-col gap-6">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-orange-500"
          />
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1e3a5f] uppercase tracking-wider mb-4">All courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                onClick={() => {
                  const isStudent = window.location.pathname.startsWith('/student');
                  navigate(isStudent ? `/student/courses/${course.id}` : `/courses/${course.id}`);
                }}
                className="flex flex-col h-full justify-between hover:-translate-y-1 transition-all p-0 overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
              >
                <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{course.org}</span>
                    <h3 className="font-bold text-[#1e3a5f] text-xs mt-1 line-clamp-2 min-h-[32px]">{course.title}</h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium">{course.duration}</span>
                    <span className="font-bold text-orange-500">{course.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-1.5 mt-4 text-xs font-semibold">
          <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer">Previous</button>
          <button className="px-3.5 py-1.5 rounded bg-orange-500 text-white font-bold">1</button>
          <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">2</button>
          <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">3</button>
          <span className="px-2 text-gray-400">...</span>
          <button className="px-3.5 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">108</button>
          <button className="px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Next</button>
        </div>
      </div>
    </div>
  );
}
