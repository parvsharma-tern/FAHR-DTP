import React from 'react';
import { SkillDomain, SubSkill } from '../types';
import { ArrowLeft, ExternalLink, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface SkillDrillDownProps {
  domain: SkillDomain;
  onBack: () => void;
}

const SkillDrillDown: React.FC<SkillDrillDownProps> = ({ domain, onBack }) => {
  const subSkills: SubSkill[] = [
    { id: '1', name: 'Financial Reporting', score: 92, statusLabel: 'Strong' },
    { id: '2', name: 'UAE VAT Compliance', score: 88, statusLabel: 'Strong' },
    { id: '3', name: 'Budget Forecasting', score: 76, statusLabel: 'Good' },
    { id: '4', name: 'Internal Controls', score: 65, statusLabel: 'Improving' },
    { id: '5', name: 'Risk & Audit Readiness', score: 48, statusLabel: 'Needs Focus' },
  ];

  const getStatusColor = (label: string) => {
    switch (label) {
      case 'Strong': return 'text-[#1B5E20] bg-[#E8F5E9] border-[#C8E6C9]';
      case 'Good': return 'text-[#004D40] bg-[#E0F2F1] border-[#B2DFDB]';
      case 'Improving': return 'text-[#E65100] bg-[#FFF3E0] border-[#FFE0B2]';
      case 'Needs Focus': return 'text-[#BF360C] bg-[#FBE9E7] border-[#FFCCBC]';
      default: return 'text-[#5D4037] bg-[#EFEBE9] border-[#D7CCC8]';
    }
  };

  const getProgressBarColor = (label: string) => {
    switch (label) {
      case 'Strong': return 'bg-[#43A047]';
      case 'Good': return 'bg-[#00897B]';
      case 'Improving': return 'bg-[#FB8C00]';
      case 'Needs Focus': return 'bg-[#D84315]';
      default: return 'bg-[#8D6E63]';
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 ease-out">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#EBE0D3] text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div>
           <h2 className="text-2xl font-serif font-bold text-[#2C1810]">{domain.name} – Detailed View</h2>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EBE0D3] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF9F0] rounded-bl-full -z-0"></div>

        <div className="flex items-center gap-6 z-10">
          <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full border-[6px] border-[#FFF9F0] shadow-inner text-[#2C1810]">
            <span className="text-2xl font-bold">{domain.score}</span>
            <span className="absolute text-[10px] text-[#8D6E63] bottom-3 font-medium">/100</span>
          </div>
          <div>
            <div className="text-xs text-[#8D6E63] uppercase tracking-wider font-bold mb-1">Current Domain</div>
            <h3 className="text-xl font-bold text-[#2C1810]">{domain.name}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(domain.level === 'Expert' || domain.level === 'Advanced' ? 'Strong' : 'Good')}`}>
                {domain.level}
              </span>
              <span className="text-xs text-[#8D6E63] font-medium flex items-center gap-1">
                Last Updated: <span className="text-[#5D4037]">Today</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Insight Card */}
        <div className="hidden md:flex items-start gap-3 px-5 py-4 bg-[#EFEBE9] rounded-lg max-w-sm border border-[#D7CCC8] z-10">
           <AlertCircle className="w-5 h-5 text-[#5D4037] flex-shrink-0 mt-0.5" />
           <p className="text-sm text-[#5D4037] leading-relaxed">
             You are in the top <span className="font-bold">15%</span> of peers for <span className="font-bold">Financial Reporting</span>. Consider mentoring junior staff to earn extra Learning Credits.
           </p>
        </div>
      </div>

      {/* Skill Breakdown Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EBE0D3] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EBE0D3] bg-[#FFF9F0] flex justify-between items-center">
           <h3 className="font-bold text-[#2C1810]">Skill Breakdown</h3>
           <span className="text-xs font-bold text-[#5D4037] bg-white px-3 py-1 rounded-full border border-[#EBE0D3] shadow-sm">
             {subSkills.length} Competencies
           </span>
        </div>

        <div className="divide-y divide-[#EBE0D3]">
          {subSkills.map((skill) => (
            <div key={skill.id} className="p-6 hover:bg-[#FFF9F0]/50 transition-colors group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                
                {/* Name and Status */}
                <div className="w-full sm:w-1/3 min-w-[200px]">
                  <h4 className="font-semibold text-[#2C1810] mb-2">{skill.name}</h4>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(skill.statusLabel)}`}>
                    {skill.statusLabel === 'Strong' && <CheckCircle2 className="w-3 h-3" />}
                    {skill.statusLabel === 'Good' && <CheckCircle2 className="w-3 h-3" />}
                    {skill.statusLabel === 'Improving' && <TrendingUp className="w-3 h-3" />}
                    {skill.statusLabel === 'Needs Focus' && <AlertTriangle className="w-3 h-3" />}
                    {skill.statusLabel}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-[#EFEBE9] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressBarColor(skill.statusLabel)} transition-all duration-1000 ease-out relative`}
                      style={{ width: `${skill.score}%` }}
                    >
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#5D4037] w-8 text-right tabular-nums">{skill.score}</span>
                </div>

                {/* Action Link */}
                <div className="sm:w-auto w-full flex justify-end">
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8D6E63] hover:text-[#5D4037] hover:underline decoration-[#D4B996] underline-offset-4 transition-all opacity-80 group-hover:opacity-100">
                    View Skill Evidence
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center pb-8">
        <p className="text-xs font-bold text-[#BCAAA4] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <span className="w-1 h-1 rounded-full bg-[#BCAAA4]"></span>
          Powered by FAHR AI Talent Engine
          <span className="w-1 h-1 rounded-full bg-[#BCAAA4]"></span>
        </p>
      </div>
    </div>
  );
};

export default SkillDrillDown;