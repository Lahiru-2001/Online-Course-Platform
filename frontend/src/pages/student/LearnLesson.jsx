import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Download, CheckCircle, PlayCircle, 
  FileText, FolderArchive, CheckCircle2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';

export default function LearnLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [notes, setNotes] = useState('');
  const [lessonCount] = useState(129);

  const quizOptions = [
    { id: 'a', label: 'User Interface', correct: true },
    { id: 'b', label: 'User Interface', correct: false },
    { id: 'c', label: 'User Interface', correct: false },
  ];

  const handleSubmitQuiz = () => {
    if (selectedAnswer !== null) {
      setQuizSubmitted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Main Video Player Area */}
      <Card className="p-0 overflow-hidden border border-gray-200 shadow-sm">
        <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50 aspect-video flex items-center justify-center relative">
          <div className="text-center">
            <PlayCircle className="w-16 h-16 text-orange-500 mx-auto mb-3 cursor-pointer hover:scale-110 transition-transform" />
            <h2 className="text-4xl font-black text-[#1e3a5f] tracking-tight">UI/UX</h2>
            <p className="text-xs text-gray-500 mt-1 font-semibold">Design Fundamentals — Lecture {lessonCount}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="px-0">
          <div className="h-1.5 bg-gray-200 w-full">
            <div className="h-full bg-blue-500 rounded-r-full" style={{ width: '35%' }}></div>
          </div>
        </div>
      </Card>

      {/* Content Grid: Video Lesson + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Lesson Thumbnail */}
        <Card className="p-0 overflow-hidden border border-gray-200">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Video Lesson</h3>
          </div>
          <div className="bg-slate-950 aspect-video flex items-center justify-center text-gray-400 relative">
            <div className="text-center">
              <PlayCircle className="w-12 h-12 text-orange-500 mx-auto mb-2 opacity-90" />
              <span className="text-xs font-semibold">UI/UX Design Fundamentals</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] bg-black/60 px-3 py-1.5 rounded text-white font-mono">
              <div className="flex items-center gap-3">
                <PlayCircle className="w-3.5 h-3.5" />
                <span>05:30 / 25:10</span>
              </div>
              <span>HD</span>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-4">Documents</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: 'UI Design Guide.pdf', icon: FileText, color: 'text-red-500' },
              { name: 'UI Design Guide.pdf', icon: FileText, color: 'text-red-500' },
              { name: 'Wireframe Templates.zip', icon: FolderArchive, color: 'text-yellow-500' },
              { name: 'Wireframe Templates.zip', icon: FolderArchive, color: 'text-yellow-500' }
            ].map((doc, idx) => {
              const DocIcon = doc.icon;
              return (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-orange-50/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <DocIcon className={`w-5 h-5 ${doc.color} shrink-0`} />
                    <span className="font-semibold text-gray-700 text-xs group-hover:text-orange-600 transition-colors">{doc.name}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-orange-500 shrink-0 transition-colors" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quiz + My Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Card */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-5">Quiz</h3>
          
          {!quizSubmitted ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold text-gray-800">01. What does UI stand for?</p>
              <div className="flex flex-col gap-2.5">
                {quizOptions.map((opt, idx) => (
                  <label 
                    key={idx}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedAnswer === idx 
                        ? 'border-orange-400 bg-orange-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="quiz" 
                      checked={selectedAnswer === idx} 
                      onChange={() => setSelectedAnswer(idx)} 
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className={`text-sm font-medium ${selectedAnswer === idx ? 'text-orange-700' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {selectedAnswer === idx && opt.correct && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <Button onClick={handleSubmitQuiz} variant="teal" className="py-2 px-5 text-[10px] font-bold uppercase">
                  Submit
                </Button>
                <Button variant="primary" className="py-2 px-5 text-[10px] font-bold uppercase">
                  Next Quiz
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 text-lg">Answer Submitted!</h4>
              <p className="text-xs text-gray-500 mt-1">Your response has been recorded.</p>
            </div>
          )}
        </Card>

        {/* My Notes */}
        <Card className="border border-gray-200">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider mb-4">My Notes</h3>
          <textarea
            placeholder="Write your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-48 p-4 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 outline-none resize-none transition-all"
          />
        </Card>
      </div>

      {/* Assignments Card */}
      <Card className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-[#1e3a5f] text-xs uppercase tracking-wider">Assignments</h3>
          <span className="px-2 py-0.5 text-[9px] font-bold bg-green-100 text-green-700 rounded uppercase border border-green-200">On Progress</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/50 border border-gray-200 rounded-xl p-4">
          <div>
            <h4 className="font-bold text-gray-800 text-xs">Design a mobile app login screen using UI/UX best practices.</h4>
            <div className="flex items-center gap-2 mt-2.5">
              <FileText className="w-4 h-4 text-red-500" />
              <span className="text-[10px] text-gray-500 font-medium">Assignments 01.pdf</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-gray-400">Due Date : 2026.05.30</span>
            <Button variant="teal" className="py-1.5 px-4 text-[10px] font-bold uppercase">
              Submit
            </Button>
          </div>
        </div>
      </Card>

      {/* Bottom Navigation Buttons */}
      <div className="flex justify-between items-center mt-2">
        <Button 
          onClick={() => navigate('/student/my-courses')} 
          variant="teal" 
          className="py-3 px-6 font-bold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Lesson
        </Button>
        <Button 
          onClick={() => alert('Lesson marked as completed!')} 
          className="py-3 px-6 font-bold text-xs uppercase bg-orange-500 text-white hover:bg-orange-600"
        >
          Mark Lesson as Completed
        </Button>
        <Button 
          onClick={() => navigate(`/student/course/${courseId}/completed`)} 
          variant="primary" 
          className="py-3 px-6 font-bold text-xs uppercase"
        >
          Next Lesson <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
