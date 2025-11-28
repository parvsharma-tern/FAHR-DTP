import React from 'react';
import { SkillDomain } from '../types';
import CircularProgress from './ui/CircularProgress';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface SkillCardProps {
  skill: SkillDomain;
  onClick?: (skill: SkillDomain) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'Expert': 
      case 'Advanced': 
        return 'text-[#1B5E20] bg-[#E8F5E9] border-[#C8E6C9]'; // Greenish
      case 'Proficient': 
        return 'text-[#004D40] bg-[#E0F2F1] border-[#B2DFDB]'; // Tealish
      default: 
        return 'text-[#BF360C] bg-[#FBE9E7] border-[#FFCCBC]'; // Terra Cotta
    }
  };

  const getProgressColorClass = (level: string) => {
    switch (level) {
      case 'Expert': 
      case 'Advanced': 
        return 'text-[#43A047]'; // Green
      case 'Proficient': 
        return 'text-[#00897B]'; // Teal
      default: 
        return 'text-[#D84315]'; // Burnt Orange
    }
  };

  return (
    <div 
      onClick={() => onClick?.(skill)}
      className="bg-white rounded-xl p-6 shadow-sm border border-[#EBE0D3] hover:shadow-md hover:border-[#D4B996] hover:ring-2 hover:ring-[#D4B996]/30 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group cursor-pointer active:scale-[0.98]"
    >
      
      {/* Header with Icon */}
      <div className="mb-4 p-3 bg-[#FFF9F0] rounded-full text-[#5D4037] border border-[#EBE0D3] group-hover:bg-[#5D4037] group-hover:text-[#FFF9F0] transition-colors duration-300">
        {skill.icon}
      </div>

      <h3 className="text-lg font-bold text-[#2C1810] mb-1 group-hover:text-[#5D4037] transition-colors">{skill.name}</h3>
      
      {/* Descriptor Badge */}
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border ${getLevelStyles(skill.level)}`}>
        {skill.level}
      </span>

      {/* Visualization */}
      <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
        <CircularProgress 
          score={skill.score} 
          size={100} 
          strokeWidth={10} 
          color={getProgressColorClass(skill.level)}
        />
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center gap-1.5 text-xs text-[#8D6E63] mt-auto">
        {skill.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-[#43A047]" />}
        {skill.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-[#D84315]" />}
        {skill.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-[#8D6E63]" />}
        <span className="font-semibold uppercase tracking-wide">
            {skill.trend === 'up' ? 'Improving' : skill.trend === 'down' ? 'Needs Focus' : 'Stable'}
        </span>
      </div>
      
    </div>
  );
};

export default SkillCard;