import React, { useState } from 'react';
import { MessageCircle, Send, X, Lightbulb } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Forum() {
  const [selectedTopic, setSelectedTopic] = useState('Physical Science & Engendering');
  const [showModal, setShowModal] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Physical Science & Engendering');

  const topics = [
    'Physical Science & Engendering', 'Computer Science', 'Business Study',
    'Data Science', 'Health', 'Maths and logic', 'Language Learning',
  ];

  const threads = [
    { user: 'Saman S. kumar', avatar: 'https://i.pravatar.cc/40?img=11', question: 'How to configure hydraulic cylinder simulation coordinates?', body: 'Hi all, I\'m trying to align the reverse outputs of the simulated reports...', replies: 60 },
    { user: 'H. Noyota', avatar: 'https://i.pravatar.cc/40?img=12', question: 'How to configure hydraulic cylinder simulation coordinates?', body: 'Hi all, I\'m trying to align the reverse outputs of the simulated reports...', replies: 60 },
    { user: 'Saman S. kumar', avatar: 'https://i.pravatar.cc/40?img=11', question: 'How to configure hydraulic cylinder simulation coordinates?', body: 'Hi all, I\'m trying to align the reverse outputs of the simulated reports...', replies: 60 },
    { user: 'Saman S. kumar', avatar: 'https://i.pravatar.cc/40?img=11', question: 'How to configure hydraulic cylinder simulation coordinates?', body: 'Hi all, I\'m trying to align the reverse outputs of the simulated reports...', replies: 60 },
    { user: 'Pathum P. kumara', avatar: 'https://i.pravatar.cc/40?img=15', question: 'How to configure hydraulic cylinder simulation coordinates?', body: 'Hi all, I\'m trying to align the reverse outputs of the simulated reports...', replies: 60 },
  ];

  const handleSubmitQuestion = () => {
    if (questionTitle.trim()) {
      alert(`Question submitted: ${questionTitle}`);
      setShowModal(false);
      setQuestionTitle('');
      setQuestionBody('');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-64 shrink-0">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Topics</h3>
        <div className="flex flex-col gap-1">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTopic === topic
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#1e3a5f]">{selectedTopic}</h2>
          <Button onClick={() => setShowModal(true)} variant="primary" className="py-2 px-4 text-xs font-bold">
            Ask Question
          </Button>
        </div>

        {/* Thread List */}
        <div className="flex flex-col gap-4">
          {threads.map((thread, idx) => (
            <Card key={idx} className="border border-gray-200 p-5">
              <div className="flex items-start gap-3">
                <img src={thread.avatar} alt={thread.user} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 text-sm">{thread.user}</span>
                  </div>
                  <h4 className="font-bold text-[#1e3a5f] text-sm mt-1">{thread.question}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{thread.body}</p>
                  <div className="flex justify-end mt-3">
                    <button className="text-orange-500 text-xs font-bold hover:underline flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> Reply ({thread.replies})
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-bold text-sm">Ask a New Question</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Question Title</label>
                <input
                  type="text" placeholder="Enter your question title" value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Select Course Field</label>
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 bg-white">
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Describe your Question</label>
                <textarea value={questionBody} onChange={(e) => setQuestionBody(e.target.value)}
                  className="w-full h-28 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 resize-none" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="text-xs font-semibold text-gray-500 hover:text-gray-700">Cancel</button>
                <Button onClick={handleSubmitQuestion} variant="primary" className="py-2 px-5 text-xs font-bold">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
