import React from 'react';
import { Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#184B65] text-white/90 py-5 px-6 text-sm border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-wider">LMS</span>
        </div>

        {/* Center: Copyright */}
        <div className="text-xs text-white/70">
          &copy; 2024 LMS Sri Lanka. All Rights Reserved.
        </div>

        {/* Right: Links & Icons */}
        <div className="flex items-center gap-6 flex-wrap justify-center text-xs">
          <a href="#" className="hover:text-orange-400 transition-colors">Support</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a>
          
          <div className="flex items-center gap-3 border-l border-white/20 pl-4 text-white/60">
            <button className="hover:text-white transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="hover:text-white transition-colors" aria-label="Global Language">
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
