import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Check } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function UploadMaterial() {
  const navigate = useNavigate();
  const [course, setCourse] = useState('Introduction to UI/UX Design');
  const [title, setTitle] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    alert('Course lecture material uploaded successfully!');
    navigate('/instructor/courses');
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-[#1e3a5f]">Upload Course Material</h1>
      </div>

      <Card className="border border-gray-200 shadow-sm p-6 md:p-8">
        <form onSubmit={handleUpload} className="flex flex-col gap-6">
          
          {/* Step 1: Course Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-extrabold text-gray-800 text-sm">Step 1: Course Details</h3>
            
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Select Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
              >
                <option>Introduction to UI/UX Design</option>
                <option>Advanced React Architecture</option>
                <option>G.C.E. A/L ICT</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Material Title</label>
              <input
                type="text"
                placeholder="e.g., Chapter 1: Wireframing Basics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Step 2: File Upload */}
          <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
            <h3 className="font-extrabold text-gray-800 text-sm">Step 2: File Upload</h3>
            
            <div className="border-2 border-dashed border-gray-250 hover:border-orange-500 bg-gray-50/50 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
              <div className="w-12 h-12 bg-blue-50/80 rounded-full flex items-center justify-center text-[#1e3a5f] mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-800">Click to upload or drag and drop</span>
              <p className="text-[10px] text-gray-400 mt-1">PDF, MP4, ZIP or PPTX (Max. 500MB)</p>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <Button 
              type="button" 
              onClick={() => navigate('/instructor/courses')} 
              variant="outline" 
              className="py-2.5 px-6 text-xs font-bold uppercase border-gray-300 text-gray-700 hover:bg-gray-50 shadow-none"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="py-2.5 px-6 text-xs font-bold uppercase bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Upload Material
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}
