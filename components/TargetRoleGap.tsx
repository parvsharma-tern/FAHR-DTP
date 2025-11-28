import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserProfile, LearningWallet } from '../types';
import { ArrowLeft, Sparkles, RefreshCw, ChevronDown, CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, Calendar, Share2, Plus, ArrowRight } from 'lucide-react';

interface TargetRoleGapProps {
  user: UserProfile;
  wallet: LearningWallet;
  onBack: () => void;
}

interface GapItem {
  id: string;
  skill: string;
  required: number;
  current: number;
  gapLevel: 'Small' | 'Moderate' | 'High';
}

interface DomainGap {
  name: string;
  items: GapItem[];
}

const TargetRoleGap: React.FC<TargetRoleGapProps> = ({ user, wallet, onBack }) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const [aiExplanation, setAiExplanation] = useState<string>(
    "You already meet most technical requirements for a Senior Accountant. Your main gaps are in risk & audit readiness and people leadership, which are critical for the senior level."
  );

  const [actionPlan, setActionPlan] = useState<string[]>(
    [
      "Enroll in 'Financial Controls & Risk Awareness' (25 credits)",
      "Take 'Digital Tools for Accountants' (15 credits) to bridge the tech gap",
      "Join one internal project where you present monthly financials to leadership",
      "Complete a short leadership micro-course on giving feedback"
    ]
  );

  // Gemini Integration for Fit Explanation
  const handleExplainFit = async () => {
    setIsExplaining(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a career coach for FAHR (UAE Government).
        User: Ahmed Khan, Accountant. 
        Target: Senior Accountant.
        Match Score: 78%.
        Gaps: Risk & Audit (High), Leadership (High), Digital Tools (Moderate).
        
        Write a 2-3 sentence professional, encouraging explanation of why he is a good fit but pointing out the specific gaps he needs to address to reach the Senior level.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      if (response.text) {
        setAiExplanation(response.text);
      }
    } catch (error) {
      console.error("Error generating explanation", error);
    } finally {
      setIsExplaining(false);
    }
  };

  // Gemini Integration for Action Plan
  const handleRegeneratePlan = async () => {
    setIsRegenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a career coach for FAHR.
        Create a 4-step bulleted action plan for Ahmed to become a Senior Accountant in 3-6 months.
        Context: He has 120 learning credits.
        Gaps: 
        1. Risk & Audit (Need +25 pts)
        2. Leadership (Need +30 pts)
        3. Excel/BI Tools (Need +15 pts)
        
        Output strictly 4 distinct, actionable steps. Do not include intro text.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        // Simple parsing to split lines, removing generic bullets if present
        const steps = response.text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[\d\-\*\.]+\s*/, ''));
        setActionPlan(steps.slice(0, 4));
      }
    } catch (error) {
      console.error("Error regenerating plan", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const domains: DomainGap[] = [
    {
      name: 'Technical Skills',
      items: [
        { id: 't1', skill: 'Financial Reporting', required: 90, current: 88, gapLevel: 'Small' },
        { id: 't2', skill: 'UAE VAT Compliance', required: 85, current: 75, gapLevel: 'Moderate' },
        { id: 't3', skill: 'Risk & Audit Readiness', required: 85, current: 60, gapLevel: 'High' },
      ]
    },
    {
      name: 'Behavioural Skills',
      items: [
        { id: 'b1', skill: 'Stakeholder Communication', required: 80, current: 70, gapLevel: 'Moderate' },
        { id: 'b2', skill: 'Problem Solving', required: 80, current: 72, gapLevel: 'Small' },
      ]
    },
    {
      name: 'Digital Literacy',
      items: [
        { id: 'd1', skill: 'Excel / Sheets Mastery', required: 85, current: 70, gapLevel: 'Moderate' },
        { id: 'd2', skill: 'Financial BI Tools', required: 80, current: 60, gapLevel: 'High' },
      ]
    },
    {
      name: 'Leadership Skills',
      items: [
        { id: 'l1', skill: 'Coaching Juniors', required: 75, current: 45, gapLevel: 'High' },
        { id: 'l2', skill: 'Decision Making', required: 80, current: 55, gapLevel: 'High' },
      ]
    }
  ];

  const getGapColor = (level: string) => {
    switch (level) {
      case 'Small': return 'text-[#43A047] bg-[#E8F5E9] border-[#C8E6C9]';
      case 'Moderate': return 'text-[#F57F17] bg-[#FFF9C4] border-[#FFF59D]';
      case 'High': return 'text-[#D84315] bg-[#FBE9E7] border-[#FFCCBC]';
      default: return 'text-gray-500';
    }
  };

  const getIndicatorColor = (level: string) => {
    switch (level) {
      case 'Small': return 'bg-[#43A047]';
      case 'Moderate': return 'bg-[#FBC02D]';
      case 'High': return 'bg-[#D84315]';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 ease-out pb-20">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#EBE0D3] text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2C1810]">Target Role: Senior Accountant</h2>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4B996]" />
              <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-wide">Suggested by FAHR AI</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D4B996] rounded-lg text-sm font-bold text-[#5D4037] hover:bg-[#FFF9F0] transition-colors shadow-sm">
          Change Target Role
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Role Fit Summary Card */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#EBE0D3] mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3CBA8] opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          
          {/* Score Circle */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-[6px] border-[#FFF9F0] shadow-inner bg-white">
               <svg className="absolute w-full h-full transform -rotate-90">
                 <circle cx="48" cy="48" r="42" stroke="#EFEBE9" strokeWidth="6" fill="none" />
                 <circle cx="48" cy="48" r="42" stroke="#43A047" strokeWidth="6" fill="none" strokeDasharray="264" strokeDashoffset="58" strokeLinecap="round" />
               </svg>
               <div className="text-center">
                 <span className="text-2xl font-bold text-[#2C1810]">78%</span>
               </div>
            </div>
            <div>
               <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] rounded-md text-xs font-bold uppercase tracking-wide mb-2">
                 Good Fit
               </span>
               <h3 className="text-xl font-bold text-[#2C1810]">Strong Potential</h3>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="flex-1 bg-[#FAFAFA] rounded-lg p-5 border border-[#F5F5F5]">
            <p className="text-sm text-[#5D4037] leading-relaxed italic">
              "{aiExplanation}"
            </p>
            <button 
              onClick={handleExplainFit}
              disabled={isExplaining}
              className="mt-3 text-xs font-bold text-[#D84315] hover:text-[#BF360C] flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              {isExplaining ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {isExplaining ? "Analyzing..." : "Ask AI to Explain"} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Skill Gaps */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-[#8D6E63]" />
            <h3 className="text-lg font-bold text-[#5D4037] uppercase tracking-wider">Skill Gap Analysis</h3>
          </div>

          {domains.map((domain, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-[#EBE0D3] overflow-hidden">
               <div className="px-5 py-3 bg-[#FFF9F0] border-b border-[#EBE0D3] font-bold text-[#2C1810] text-sm flex justify-between">
                 <span>{domain.name}</span>
                 <span className="text-xs text-[#8D6E63] font-normal uppercase tracking-wide">Target vs Current</span>
               </div>
               
               <div className="divide-y divide-[#F5F5F5]">
                 {domain.items.map((item) => (
                   <div key={item.id} className="p-4 hover:bg-[#FAFAFA] transition-colors">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                       
                       <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                           <div className={`w-2 h-2 rounded-full ${getIndicatorColor(item.gapLevel)}`}></div>
                           <span className="font-semibold text-[#2C1810] text-sm">{item.skill}</span>
                         </div>
                         <div className="flex items-center gap-4 text-xs text-[#8D6E63] pl-4">
                            <span>Req: <span className="font-bold text-[#5D4037]">{item.required}</span></span>
                            <span>You: <span className="font-bold text-[#5D4037]">{item.current}</span></span>
                         </div>
                       </div>

                       <div className="flex items-center gap-4">
                          <div className="w-24 h-1.5 bg-[#EFEBE9] rounded-full overflow-hidden hidden sm:block">
                             <div className="h-full bg-[#D4B996] rounded-full" style={{ width: `${(item.current / item.required) * 100}%` }}></div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide min-w-[80px] text-center border ${getGapColor(item.gapLevel)}`}>
                            {item.gapLevel} Gap
                          </span>
                       </div>

                     </div>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>

        {/* Right Column: AI Action Plan & Timeline */}
        <div className="space-y-6">
          
          {/* Timeline Card */}
          <div className="bg-[#2C1810] text-[#FFF9F0] rounded-xl p-6 shadow-md border border-[#5D4037] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD54F] opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4 text-[#D7CCC8]">
                 <TrendingUp className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-wider">Time to Readiness</span>
               </div>
               <div className="text-3xl font-serif font-bold mb-1">4–6 Months</div>
               <p className="text-xs text-[#BCAAA4] mb-4">with 2-3 hours/week of study</p>
               
               <div className="p-3 bg-[#5D4037]/50 rounded-lg border border-[#5D4037] backdrop-blur-sm">
                 <p className="text-xs leading-relaxed italic text-[#E3CBA8]">
                   "If you complete 2 courses and apply skills in a project, you could be ready for Senior Accountant in 4-6 months."
                 </p>
               </div>
             </div>
          </div>

          {/* AI Action Plan */}
          <div className="bg-white rounded-xl shadow-sm border border-[#EBE0D3] p-6 relative">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-[#5D4037] uppercase tracking-wider flex items-center gap-2">
                 <Bot className="w-4 h-4" />
                 AI Action Plan
               </h3>
            </div>
            
            <p className="text-xs text-[#8D6E63] mb-4">
              Based on your gaps and available learning credits ({wallet.credits}), here is a suggested plan.
            </p>

            <ul className="space-y-3 mb-6">
              {actionPlan.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#2C1810]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFF9F0] border border-[#D4B996] text-[#5D4037] font-bold text-[10px] flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={handleRegeneratePlan}
              disabled={isRegenerating}
              className="w-full py-2.5 bg-[#5D4037] text-white rounded-lg font-bold text-sm hover:bg-[#4E342E] transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRegenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-[#FFD54F]" />}
              {isRegenerating ? "Regenerating..." : "Regenerate Plan with AI"}
            </button>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <button className="py-2 px-3 border border-[#EBE0D3] rounded-lg text-xs font-bold text-[#5D4037] hover:bg-[#FFF9F0] transition-colors flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> To Hub
              </button>
              <button className="py-2 px-3 border border-[#EBE0D3] rounded-lg text-xs font-bold text-[#5D4037] hover:bg-[#FFF9F0] transition-colors flex items-center justify-center gap-1">
                <Share2 className="w-3 h-3" /> Share
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center border-t border-[#E6D5C3] pt-6">
        <p className="text-[10px] font-bold text-[#BCAAA4] uppercase tracking-[0.1em]">
          Powered by FAHR Dynamic Talent Profile · AI recommendations are indicative.
        </p>
      </footer>
    </div>
  );
};

// Icon helper
const Bot = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export default TargetRoleGap;
