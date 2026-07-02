import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Trophy, Clock, Gauge, FileText, CheckCircle, PlayCircle, Download, ArrowLeft, ArrowRight 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function LearnCompleted() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Top Banner congratulating student */}
      <div className="bg-[#e2f8e5] border border-green-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-32 md:w-40 shrink-0 flex justify-center">
          <Trophy className="w-24 h-24 text-yellow-500 stroke-[1.5]" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-[#1a442e]">Congratulations!</h2>
          <p className="text-sm text-green-700/90 font-semibold mt-1">
            You have successfully completed this lesson. Great job! Keep up the excellent work.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto md:mx-0">
            <div className="bg-white p-3 rounded-xl border border-green-100 text-center shadow-sm">
              <Clock className="w-5 h-5 text-gray-500 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Time Spent</span>
              <span className="text-sm font-extrabold text-gray-800">25.10</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-green-100 text-center shadow-sm">
              <Gauge className="w-5 h-5 text-gray-500 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Score</span>
              <span className="text-sm font-extrabold text-gray-800">100%</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-green-100 text-center shadow-sm">
              <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Status</span>
              <span className="text-sm font-extrabold text-green-600">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Video & Quiz */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-0 overflow-hidden relative border border-gray-200">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Video Lesson</h3>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase">Completed</span>
            </div>
            <div className="bg-slate-950 aspect-video flex items-center justify-center text-gray-400 relative">
              <div className="text-center">
                <PlayCircle className="w-14 h-14 text-orange-500 mx-auto mb-2 opacity-90" />
                <span className="text-xs font-semibold">UI/UX Design Fundamentals</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] bg-black/60 px-3 py-1.5 rounded text-white font-mono">
                <span>05:30 / 25:10</span>
                <span>HD 1080p</span>
              </div>
            </div>
          </Card>

          {/* Quiz score widget */}
          <Card className="border border-gray-200">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-5">Quiz</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-green-50/50 border border-green-100 rounded-xl">
              <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center text-green-600 font-black text-xl bg-white">
                100%
              </div>
              <div className="flex-grow text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-yellow-600">
                  <Trophy className="w-5 h-5 shrink-0" />
                  <span className="font-extrabold text-sm">Excellent Score!</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">You got 4 out of 4 correct answers on the first attempt.</p>
                <Button onClick={() => alert('Reviewing answers...')} variant="teal" className="py-1.5 px-4 text-[10px] font-bold mt-4">
                  Review Answers
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Documents & Notes */}
        <div className="flex flex-col gap-6">
          <Card className="border border-gray-200">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-4">Documents</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'UI Design Guide.pdf', size: '2.4 MB' },
                { name: 'UI Design Guide.pdf', size: '2.4 MB' },
                { name: 'Wireframe Templates.zip', size: '2.4 MB' },
                { name: 'Wireframe Templates.zip', size: '2.4 MB' }
              ].map((doc, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs truncate max-w-[150px]">{doc.name}</h4>
                    <span className="text-[10px] text-gray-400">{doc.size}</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-gray-200">
            <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-4">My Notes</h3>
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-2 text-xs text-gray-700">
              <p className="font-bold text-gray-900">Great lesson on UI/UX fundamentals.</p>
              <div className="flex flex-col gap-1 text-gray-500 mt-2 list-disc pl-4 font-medium">
                <li>User-centered design is essential</li>
                <li>Keep interfaces simple and consistent</li>
                <li>Always test with real users</li>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Assignments Card */}
      <Card className="border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Assignments</h3>
          <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase">Completed</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/50 border border-gray-200 rounded-xl p-4">
          <div>
            <h4 className="font-bold text-gray-800 text-xs">Design a mobile app login screen using UI/UX best practices.</h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-gray-400">Assignments 01.pdf (2.4 MB)</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-3 justify-between sm:justify-start">
            <span className="text-[10px] text-gray-400">Submitted: 2026.05.30</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-lg border border-green-200">
              Graded: 100%
            </span>
          </div>
        </div>
      </Card>

      {/* Bottom Nav Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => navigate('/student/my-courses')} variant="teal" className="py-2.5 px-6 font-bold text-xs uppercase">
          <ArrowLeft className="w-4 h-4" /> Previous Lesson
        </Button>
        <Button onClick={() => navigate('/student/my-courses')} variant="primary" className="py-2.5 px-6 font-bold text-xs uppercase">
          Next Lesson <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
