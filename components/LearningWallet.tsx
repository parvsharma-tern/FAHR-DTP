import React from 'react';
import { LearningWallet as LearningWalletType } from '../types';
import { Wallet, Sparkles, ArrowRight } from 'lucide-react';

interface LearningWalletProps {
  wallet: LearningWalletType;
  onStartUpskilling?: () => void;
}

const LearningWallet: React.FC<LearningWalletProps> = ({ wallet, onStartUpskilling }) => {
  return (
    <div className="bg-gradient-to-br from-[#2C1810] to-[#5D4037] text-white rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden border border-[#5D4037]">
      {/* Abstract Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3CBA8] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Side: Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 text-[#D7CCC8]">
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.1em]">Learning Wallet</span>
          </div>
          
          <h2 className="text-4xl font-serif font-bold mb-1 text-[#FFF9F0]">{wallet.credits} <span className="text-xl font-sans font-normal text-[#BCAAA4]">Credits</span></h2>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-[#BCAAA4]">Current Level:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#FFD54F]/30 bg-[#FFD54F]/10 text-[#FFD54F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {wallet.level}
            </span>
          </div>
        </div>

        {/* Right Side: CTA */}
        <button 
          onClick={onStartUpskilling}
          className="group flex items-center gap-3 bg-[#FFF9F0] text-[#2C1810] hover:bg-[#E3CBA8] px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg active:scale-95 w-full md:w-auto justify-center cursor-pointer"
        >
          Start Upskilling
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LearningWallet;