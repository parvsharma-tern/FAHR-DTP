import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, SkillDomain, LearningWallet } from '../types';
import { ArrowLeft, Send, Sparkles, Bot, User, MapPin, ChevronRight, Zap, Target, BookOpen } from 'lucide-react';

interface AICoachProps {
  user: UserProfile;
  skills: SkillDomain[];
  wallet: LearningWallet;
  onBack: () => void;
  onViewGap?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const AICoach: React.FC<AICoachProps> = ({ user, skills, wallet, onBack, onViewGap }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      text: 'How can I move towards a Senior Accountant role?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'ai',
      text: "Based on your current profile, you're 87% of the way there! To bridge the gap to Senior Accountant, I recommend focusing on these key areas:\n\n1. Risk & Audit Readiness (Currently 'Needs Focus')\n2. Leadership Skills (Currently 'Developing')\n\nI've found some learning paths that fit your schedule.",
      timestamp: '10:30 AM'
    }
  ]);

  const quickPrompts = [
    "Where are my biggest gaps?",
    "What should I learn next?",
    "How can I reach the next level?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "That's a great question. Based on your 'Technical Skills' score of 85, you are well-positioned. I'd suggest starting with the 'Financial Controls' module to boost your audit readiness score specifically.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'text-green-700 bg-green-100';
      case 'Proficient': return 'text-teal-700 bg-teal-100';
      case 'Developing': return 'text-orange-700 bg-orange-100';
      default: return 'text-red-700 bg-red-100';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] min-h-[600px] animate-in slide-in-from-right-8 fade-in duration-500">
      
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#EBE0D3] text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2C1810] flex items-center gap-2">
            AI Career & Skills Coach
            <Sparkles className="w-5 h-5 text-[#D4B996]" />
          </h2>
          <p className="text-sm text-[#8D6E63] font-medium">Personalised guidance based on your Dynamic Talent Profile</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* Left Panel - Profile Snapshot */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto lg:overflow-visible">
          <div className="bg-white rounded-xl p-5 border border-[#EBE0D3] shadow-sm">
            <div className="flex items-center gap-3 mb-4 border-b border-[#EBE0D3] pb-4">
               <div className="w-12 h-12 rounded-full bg-[#E3CBA8] flex items-center justify-center text-[#5D4037] border border-[#D4B996]">
                  <User className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-[#2C1810] leading-tight">{user.name}</h3>
                 <p className="text-xs text-[#8D6E63]">{user.role}</p>
                 <div className="flex items-center gap-1 text-[10px] text-[#BCAAA4] mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {user.location}
                 </div>
               </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase text-[#8D6E63] tracking-wider">Skill Snapshot</h4>
              {skills.map(skill => (
                <div key={skill.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#5D4037]">{skill.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getSkillColor(skill.level)}`}>
                      {skill.score}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#EFEBE9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D4B996] rounded-full" 
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FFF9F0] rounded-lg p-3 border border-[#EBE0D3]">
               <h4 className="text-xs font-bold uppercase text-[#8D6E63] tracking-wider mb-2 flex items-center gap-1">
                 <Zap className="w-3 h-3 text-[#FFD54F]" fill="currentColor" />
                 Learning Wallet
               </h4>
               <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-serif font-bold text-[#2C1810] block leading-none">{wallet.credits}</span>
                    <span className="text-[10px] text-[#8D6E63]">Credits Available</span>
                  </div>
                  <span className="px-2 py-1 bg-[#2C1810] text-[#FFF9F0] text-xs font-bold rounded">
                    {wallet.level}
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* Main Area - Chat Interface */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-[#EBE0D3] shadow-sm overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="bg-[#FFF9F0] border-b border-[#EBE0D3] p-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#5D4037] flex items-center justify-center text-white shadow-sm border-2 border-white">
                <Bot className="w-6 h-6" />
             </div>
             <div>
                <h3 className="font-bold text-[#2C1810] text-sm">FAHR AI Coach</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   <span className="text-xs text-[#8D6E63] font-medium">Online · Uses your skills data to guide you</span>
                </div>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#FAFAFA]">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-[#E3CBA8] text-[#5D4037]' : 'bg-[#5D4037] text-white'}`}>
                       {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#5D4037] text-white rounded-tr-none' 
                        : 'bg-white border border-[#EBE0D3] text-[#2C1810] rounded-tl-none'
                    }`}>
                       <p className="whitespace-pre-line">{msg.text}</p>
                       <span className={`text-[10px] mt-2 block opacity-70 ${msg.sender === 'user' ? 'text-right text-[#D7CCC8]' : 'text-left text-[#BCAAA4]'}`}>
                         {msg.timestamp}
                       </span>
                    </div>

                 </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
          </div>

          {/* Action Strip (Overlay/Bottom) */}
          <div className="bg-white border-t border-[#EBE0D3] p-4">
             {/* Quick Prompts */}
             <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {quickPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setInputText(prompt);
                      // In a real app, this would trigger send directly or focus input
                    }}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full border border-[#D4B996] bg-[#FFF9F0] text-[#5D4037] text-xs font-bold hover:bg-[#D4B996] hover:text-[#2C1810] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
             </div>

             {/* Input Area */}
             <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your career, skills, or next steps..."
                  className="flex-1 bg-[#FAFAFA] border border-[#EBE0D3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996] focus:border-transparent placeholder-[#BCAAA4] text-[#2C1810]"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="bg-[#5D4037] hover:bg-[#4E342E] disabled:bg-[#BCAAA4] text-white p-3 rounded-lg transition-colors flex items-center justify-center shadow-sm active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
             </div>
          </div>

        </div>
      </div>

      {/* Recommended Actions Strip (Outside chat, below it) */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-[#8D6E63] uppercase tracking-wider mb-3">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white p-4 rounded-lg border border-[#EBE0D3] shadow-sm flex flex-col justify-between group hover:border-[#D4B996] transition-colors cursor-pointer">
             <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                   <BookOpen className="w-4 h-4 text-[#D84315]" />
                   <span className="text-[10px] font-bold uppercase text-[#D84315] tracking-wide">Course</span>
                </div>
                <h4 className="font-bold text-[#2C1810] text-sm leading-tight">Financial Controls & Risk Awareness</h4>
                <p className="text-xs text-[#8D6E63] mt-1">25 Credits • Technical</p>
             </div>
             <button className="text-xs font-bold text-[#5D4037] flex items-center gap-1 group-hover:underline">
               Open in Learning Hub <ChevronRight className="w-3 h-3" />
             </button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#EBE0D3] shadow-sm flex flex-col justify-between group hover:border-[#D4B996] transition-colors cursor-pointer">
             <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                   <Target className="w-4 h-4 text-[#43A047]" />
                   <span className="text-[10px] font-bold uppercase text-[#43A047] tracking-wide">Activity</span>
                </div>
                <h4 className="font-bold text-[#2C1810] text-sm leading-tight">Improve Leadership</h4>
                <p className="text-xs text-[#8D6E63] mt-1">Join internal project as finance lead</p>
             </div>
             <button className="text-xs font-bold text-[#5D4037] flex items-center gap-1 group-hover:underline">
               View Details <ChevronRight className="w-3 h-3" />
             </button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#EBE0D3] shadow-sm flex flex-col justify-between group hover:border-[#D4B996] transition-colors cursor-pointer">
             <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                   <Zap className="w-4 h-4 text-[#FFD54F]" fill="currentColor" />
                   <span className="text-[10px] font-bold uppercase text-[#FFB300] tracking-wide">Career Goal</span>
                </div>
                <h4 className="font-bold text-[#2C1810] text-sm leading-tight">Target: Senior Accountant</h4>
                <p className="text-xs text-[#8D6E63] mt-1">Status: 87% Match</p>
             </div>
             <button 
               onClick={onViewGap} 
               className="text-xs font-bold text-[#5D4037] flex items-center gap-1 group-hover:underline"
             >
               View Skill Gap <ChevronRight className="w-3 h-3" />
             </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center pb-4">
        <p className="text-[10px] text-[#BCAAA4]">
          Advice generated using your Dynamic Talent Profile. Final decisions remain with you and your organisation.
        </p>
      </div>
    </div>
  );
};

export default AICoach;
