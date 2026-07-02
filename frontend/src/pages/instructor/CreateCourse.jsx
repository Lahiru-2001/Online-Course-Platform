import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, Save, HelpCircle, FileText, Settings, CreditCard, Trash } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function CreateCourse() {
  const navigate = useNavigate();

  // Basic Info state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mathematics');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [description, setDescription] = useState('');

  // Curriculum state
  const [curriculum, setCurriculum] = useState([
    { id: 1, title: 'Introduction & Setup', lessons: ['Welcome & Environment Setup', 'Basic Syntax & Structure'] },
    { id: 2, title: 'Core Concepts', lessons: ['Variables & Data Types', 'Control Flow Statements'] }
  ]);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  // Settings state
  const [isPublic, setIsPublic] = useState(true);
  const [enableForum, setEnableForum] = useState(true);
  const [certificateType, setCertificateType] = useState('Completion');

  // Pricing state
  const [price, setPrice] = useState('3500');
  const [discountPrice, setDiscountPrice] = useState('2500');
  const [isFree, setIsFree] = useState(false);

  const addChapter = () => {
    if (!newChapterTitle.trim()) return;
    setCurriculum([...curriculum, {
      id: Date.now(),
      title: newChapterTitle,
      lessons: []
    }]);
    setNewChapterTitle('');
  };

  const removeChapter = (id) => {
    setCurriculum(curriculum.filter(c => c.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Course created and published successfully!');
    navigate('/instructor/courses');
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen pb-12">
      {/* Top action row */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">Create New Course</h1>
          <p className="text-xs text-gray-400">Fill in all details below on a single page to launch your course.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/instructor/courses')} variant="outline" className="py-2 px-4 text-xs font-bold uppercase border-gray-300 text-gray-700 hover:bg-gray-50 shadow-none">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary" className="py-2 px-5 text-xs font-bold uppercase">
            <Check className="w-4 h-4" /> Publish Course
          </Button>
        </div>
      </div>

      {/* Grid split */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Consolidated form sections */}
        <div className="flex-grow flex flex-col gap-6">
          
          {/* 01 Basic Info */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-gray-150 pb-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold font-mono">01</span>
              <h3 className="font-extrabold text-[#1e3a5f] text-xs uppercase tracking-wider">Basic Info</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Mathematics for A/L"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500 bg-white"
                  >
                    <option>Mathematics</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Languages</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500 bg-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Course Description</label>
                <textarea
                  placeholder="Provide a detailed overview of what students will learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
          </Card>

          {/* 02 Curriculum */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-gray-150 pb-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold font-mono">02</span>
              <h3 className="font-extrabold text-[#1e3a5f] text-xs uppercase tracking-wider">Curriculum Setup</h3>
            </div>

            <div className="flex flex-col gap-4">
              {/* Existing chapters */}
              <div className="flex flex-col gap-3">
                {curriculum.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-250 rounded-xl p-4 bg-gray-50/50 flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 text-xs">{chapter.title}</h4>
                      <button 
                        onClick={() => removeChapter(chapter.id)} 
                        className="text-red-500 hover:text-red-750 transition-colors"
                        type="button"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 pl-3 border-l-2 border-gray-300">
                      {chapter.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} className="flex justify-between items-center text-xs bg-white p-2 border border-gray-200 rounded-lg">
                          <span className="font-semibold text-gray-700">{lesson}</span>
                          <span className="text-[10px] text-gray-400 font-mono">Lecture Video</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add new chapter */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter new chapter title..."
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
                />
                <Button 
                  onClick={addChapter}
                  type="button"
                  variant="outline" 
                  className="py-2 px-4 text-xs font-bold border-orange-200 text-orange-600 hover:bg-orange-50/50 shadow-none shrink-0"
                >
                  Add Chapter
                </Button>
              </div>
            </div>
          </Card>

          {/* 03 Settings */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-gray-150 pb-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold font-mono">03</span>
              <h3 className="font-extrabold text-[#1e3a5f] text-xs uppercase tracking-wider">Course Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-gray-700">
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPublic} 
                    onChange={() => setIsPublic(!isPublic)}
                    className="accent-orange-500 w-4 h-4" 
                  />
                  <div>
                    <span className="block text-gray-800 font-bold">Public Course Visibility</span>
                    <span className="text-[10px] text-gray-400 font-medium">Make this course searchable on public catalog listings.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enableForum} 
                    onChange={() => setEnableForum(!enableForum)}
                    className="accent-orange-500 w-4 h-4" 
                  />
                  <div>
                    <span className="block text-gray-800 font-bold">Enable Discussion Forum</span>
                    <span className="text-[10px] text-gray-400 font-medium">Enable community forum section for questions and answers.</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Certification Type</label>
                <select
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500 bg-white font-bold"
                >
                  <option>Completion Certificate</option>
                  <option>Professional Academy Certification</option>
                  <option>No Certificate</option>
                </select>
              </div>
            </div>
          </Card>

          {/* 04 Pricing */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-gray-150 pb-3">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold font-mono">04</span>
              <h3 className="font-extrabold text-[#1e3a5f] text-xs uppercase tracking-wider">Pricing (LKR)</h3>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-800">
                <input 
                  type="checkbox" 
                  checked={isFree} 
                  onChange={() => setIsFree(!isFree)}
                  className="accent-orange-500 w-4 h-4" 
                />
                <span>This is a Free Course</span>
              </label>

              {!isFree && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Original Price (LKR)</label>
                    <input
                      type="number"
                      placeholder="3500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Discount Price (LKR)</label>
                    <input
                      type="number"
                      placeholder="2500"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-350 bg-white rounded-lg text-xs outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

        </div>

        {/* Right Side: Metadata / Thumbnail Upload / Progress Checklist */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          {/* Thumbnail */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-800">Course Thumbnail</h4>
            <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" alt="Thumbnail Preview" className="w-full h-full object-cover opacity-60" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium text-center">Upload a high-quality image (720x450px) to represent your course.</p>
            <Button variant="outline" className="w-full py-2 text-xs font-bold border-gray-250 text-gray-700 hover:bg-gray-50 shadow-none">
              Upload Image
            </Button>
          </Card>

          {/* Checklist progress */}
          <Card className="border border-gray-200 shadow-sm flex flex-col gap-4 text-xs">
            <h4 className="font-bold text-gray-800">Creation Progress</h4>
            <div className="flex justify-between items-center font-bold text-orange-500">
              <span className="text-gray-400">Total Completion:</span>
              <span>85%</span>
            </div>
            <ProgressBar progress={85} />

            <div className="flex flex-col gap-3.5 mt-2 text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Basic Info Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Curriculum Setup Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Settings Configured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Pricing Model Defined</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
