import React, { useState } from 'react';
import { Search, Send, Paperclip } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Saman S. kumar', role: 'instructor', text: 'Michael, I looked at the circuit coordinate system in the Fluid Systems assignment 2 you sent.', isMe: false, avatar: 'https://i.pravatar.cc/40?img=11' },
    { id: 2, sender: 'Me', role: 'student', text: 'Thank you Lecture! There was a slight confusion with the coordinates on Slide 4. I have now corrected it.', isMe: true, avatar: 'https://i.pravatar.cc/40?img=12' },
    { id: 3, sender: 'Saman S. kumar', role: 'instructor', text: 'Yes Michael, your circuit coordinates look correct now. Good luck!', isMe: false, avatar: 'https://i.pravatar.cc/40?img=11' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: 'Me',
      role: 'student',
      text: newMessage,
      isMe: true,
      avatar: 'https://i.pravatar.cc/40?img=12'
    }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-100px)] bg-gray-50/50 p-4 rounded-2xl border border-gray-200">
      {/* Left panel: Contacts sidebar */}
      <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-5 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="search..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-xs outline-none bg-gray-50 focus:bg-white focus:border-orange-500"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
        </div>

        {/* Instructors/Mentors */}
        <div>
          <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Instructors / mentors</h4>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 p-2 bg-orange-50/70 border border-orange-100 rounded-xl cursor-pointer">
              <div className="relative shrink-0">
                <img src="https://i.pravatar.cc/40?img=11" alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 truncate">Saman S. kumar ( instructor )</p>
                <p className="text-[9px] text-green-600 font-semibold mt-0.5">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="relative shrink-0">
                <img src="https://i.pravatar.cc/40?img=13" alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-left flex-grow">
                <p className="text-xs font-bold text-gray-700 truncate">Latha ( Instructor )</p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Peers */}
        <div>
          <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Study Peers</h4>
          <div className="flex flex-col gap-1.5">
            {[
              { name: 'Samana S. kumari', img: 'https://i.pravatar.cc/40?img=14' },
              { name: 'Kumara', img: 'https://i.pravatar.cc/40?img=15' },
              { name: 'Saman S. Somapala', img: 'https://i.pravatar.cc/40?img=16' }
            ].map((peer, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                <div className="relative shrink-0">
                  <img src={peer.img} alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left flex-grow">
                  <p className="text-xs font-bold text-gray-700 truncate">{peer.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: Active Chat */}
      <div className="flex-grow bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1e3a5f] text-white flex items-center gap-3">
          <div className="relative shrink-0">
            <img src="https://i.pravatar.cc/40?img=11" alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-white/20" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1e3a5f] rounded-full"></span>
          </div>
          <div className="text-left">
            <h3 className="text-xs font-bold">Saman S. kumar ( instructor )</h3>
            <p className="text-[9px] text-white/70">Replies usually within minutes</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4 min-h-[300px]">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 max-w-[85%] ${m.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <img src={m.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0" />
              <div className="flex flex-col gap-1">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.isMe 
                    ? 'bg-orange-500 text-white rounded-tr-none' 
                    : 'bg-blue-50 text-gray-800 rounded-tl-none border border-blue-100'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-150 flex items-center gap-3">
          <button type="button" className="p-2.5 hover:bg-gray-150 rounded-full transition-colors text-gray-400 hover:text-gray-600 shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs outline-none focus:bg-white focus:border-orange-500 transition-all"
          />
          <button type="submit" className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow transition-all shrink-0 hover:scale-105 active:scale-95">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
