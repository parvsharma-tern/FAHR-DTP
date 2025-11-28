import React from 'react';
import { UserProfile } from '../types';
import { RefreshCw, User } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-[#FFF9F0] border-b border-[#E6D5C3] sticky top-0 z-30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Logo & User Section */}
          <div className="flex items-center gap-6">
             {/* FAHR Logo Block */}
             <div className="flex items-center gap-3 pr-6 border-r border-[#D4B996] hidden sm:flex">
                <div className="w-10 h-10 bg-[#5D4037] rounded-full flex items-center justify-center text-[#FFF9F0]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                </div>
                <div>
                    <span className="text-2xl font-serif font-bold tracking-wide text-[#2C1810] block leading-none">FAHR</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8D6E63] block mt-1">Dynamic Talent Profile</span>
                </div>
             </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3CBA8] flex items-center justify-center text-[#5D4037] border border-[#D4B996]">
                  <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2C1810] leading-tight">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 text-sm text-[#8D6E63]">
                  <span className="font-medium">{user.role}</span>
                  <span className="text-[#D4B996]">•</span>
                  <span>{user.organization}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Status */}
          <div className="flex flex-col md:items-end gap-3">
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#5D4037] text-[#FFF9F0] text-sm font-medium rounded-lg hover:bg-[#4E342E] transition-colors shadow-sm active:scale-95 border border-[#4E342E]">
              <RefreshCw className="w-4 h-4" />
              Retake Skill Assessment
            </button>
            <div className="flex items-center gap-2 text-xs text-[#8D6E63]">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43A047] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#43A047]"></span>
                </span>
              Profile last updated: <span className="font-bold text-[#5D4037]">{user.lastUpdated}</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;