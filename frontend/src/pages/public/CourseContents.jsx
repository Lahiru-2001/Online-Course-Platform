import React, { useState } from 'react';
import { PlayCircle, Download, FileText, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function CourseContents() {
  const [expandedSection, setExpandedSection] = useState(1);

  const sections = [
    { id: 0, title: 'Get Started', duration: '1 Hour', lessons: '5 lessons' },
    { id: 1, title: 'Illustrator Structures', duration: '2 Hour', lessons: '3 lessons' },
    { id: 2, title: 'Using Illustrator', duration: '1 Hour', lessons: '4 lessons' },
    { id: 3, title: 'What is Pandas?', duration: '12:54', lessons: '5 lessons' },
    { id: 4, title: 'Work with Numpy', duration: '50:00', lessons: '3 lessons' }
  ];

  const subLessons = [
    { title: 'Lorem ipsum dolor sit amet', duration: '05:00' },
    { title: 'Lorem ipsum dolor', duration: '20:00' },
    { title: 'Lorem ipsum dolor sit amet', duration: '30:00' }
  ];

  return (
    <div className="flex flex-col gap-8 bg-gray-50/50 pb-12">
      {/* Upper Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Course Contents Accordions */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-3">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Course Contents</h2>
          
          {sections.map((sec) => (
            <div key={sec.id} className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm">
              <div 
                onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
              >
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">{sec.title}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">{sec.duration} • {sec.lessons}</span>
                </div>
                {expandedSection === sec.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>

              {expandedSection === sec.id && (
                <div className="bg-gray-50 border-t border-gray-100 p-3 flex flex-col gap-2.5">
                  {subLessons.map((sub, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-white border border-gray-150 rounded-lg hover:border-orange-200 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="font-medium text-gray-700">{idx + 1}. {sub.title}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono shrink-0">{sub.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Video + Materials */}
        <div className="flex-grow flex flex-col gap-6">
          <Card className="p-0 overflow-hidden relative border border-gray-200">
            <div className="bg-slate-900 aspect-video flex items-center justify-center text-gray-400 relative">
              <div className="text-center">
                <PlayCircle className="w-14 h-14 text-orange-500 mx-auto mb-2 opacity-90 cursor-pointer hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Preview Course Syllabus Video</span>
              </div>
            </div>
          </Card>

          {/* Get materials */}
          <Card className="border border-gray-200">
            <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-4">Get your materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-orange-50/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4.5 h-4.5 text-red-500 shrink-0" />
                    <span className="text-xs font-bold text-gray-700">Download Document {num}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

      {/* Bottom Forum / Ask Question Section */}
      <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[#1e3a5f] text-sm uppercase tracking-wider">Course Q&A</h3>
          <Button variant="primary" className="py-2 px-4 text-xs font-bold uppercase">
            Ask Question
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {[1, 2].map((num) => (
            <Card key={num} className="border border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <img src="https://i.pravatar.cc/40?img=11" alt="avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-grow text-left">
                  <span className="font-bold text-xs text-gray-800">Saman S. kumar</span>
                  <h4 className="font-bold text-[#1e3a5f] text-xs mt-1">How to configure hydraulic cylinder simulation coordinates?</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Hi all, I'm trying to align the reverse outputs of the simulated reports with the coordinates from mechatronics hydraulic slides lecture 2. Any direct equations to calculate dynamic feedback?
                  </p>
                  <div className="flex justify-end mt-2">
                    <button className="text-[10px] text-orange-500 font-bold hover:underline flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Reply (0)
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
