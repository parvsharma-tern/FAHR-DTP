import React from 'react';
import { User, ChevronRight, ShieldCheck, Leaf, Cpu, Award } from 'lucide-react';

interface CareerMobilityProfileProps {
  onBack: () => void;
}

const CareerMobilityProfile: React.FC<CareerMobilityProfileProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#5D4037] font-sans selection:bg-[#E6D5C3]">
      {/* Custom Header for this view */}
      <header className="px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6D5C3]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E3CBA8] flex items-center justify-center text-[#5D4037] border border-[#D4B996]">
              <User className="w-6 h-6" />
            </div>
            <div className="border-r border-[#D4B996] pr-6 mr-2 h-10 flex items-center">
              <div>
                <h1 className="text-xl font-bold leading-none">Ahmed</h1>
                <h1 className="text-xl font-bold leading-none">Khan</h1>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             {/* FAHR Logo placeholder / stylistic representation */}
             <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#5D4037] rounded-full flex items-center justify-center text-[#FFF9F0]">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    </div>
                    <div>
                        <span className="text-2xl font-serif font-bold tracking-wide text-[#2C1810]">FAHR</span>
                    </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8D6E63] ml-10">Dynamic Talent Profile</span>
             </div>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="bg-[#DNB888] bg-[#E3CBA8] hover:bg-[#D4B996] text-[#5D4037] px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4037] tracking-tight mb-2 font-serif uppercase">
            Career Mobility Profile
          </h2>
          <p className="text-xl text-[#2C1810] font-medium">Personalised Role Fit Map</p>
        </div>

        {/* Suggested Role Fit */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-bold text-[#5D4037] uppercase tracking-wider">Suggested Role Fit</h3>
            <div className="flex-1 h-px bg-dotted-pattern border-t-2 border-dotted border-[#D4B996]"></div>
          </div>

          <div className="space-y-4">
            {/* Card 1 - Best Fit */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EBE0D3] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div>
                <h4 className="text-2xl font-bold text-[#2C1810]">Senior Accountant</h4>
                <p className="text-[#8D6E63]">Accountant</p>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <span className="bg-[#43A047] text-white px-4 py-1.5 rounded-md font-bold text-sm">Best Fit</span>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[#2C1810]">87%</div>
                    <div className="text-xs text-[#8D6E63] uppercase">Score</div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#D4B996]" />
              </div>
            </div>

            {/* Card 2 - Good */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EBE0D3] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div>
                <h4 className="text-2xl font-bold text-[#2C1810]">Financial Analyst</h4>
                <p className="text-[#8D6E63]">Should Executive</p>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <span className="bg-[#E3CBA8] text-[#5D4037] px-4 py-1.5 rounded-md font-bold text-sm">Good</span>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[#2C1810]">71%</div>
                    <div className="text-xs text-[#8D6E63] uppercase">Score</div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#D4B996]" />
              </div>
            </div>

            {/* Card 3 - View Gaps */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EBE0D3] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div>
                <h4 className="text-2xl font-bold text-[#2C1810]">Compliance Officer</h4>
                <p className="text-[#8D6E63]">View Gaps</p>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <span className="bg-[#6D4C41] text-white px-4 py-1.5 rounded-md font-bold text-sm">View Gaps</span>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[#2C1810]">63%</div>
                    <div className="text-xs text-[#8D6E63] uppercase">Score</div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#D4B996]" />
              </div>
            </div>
          </div>
        </section>

        {/* Emerging Opportunities */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-xl font-bold text-[#8D6E63] uppercase tracking-wider">Emerging Opportunities</h3>
            <div className="flex-1 h-px bg-dotted-pattern border-t-2 border-dotted border-[#D4B996]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Item 1 */}
             <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#5D4037] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Leaf className="w-10 h-10 text-[#5D4037]" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-bold text-[#2C1810] leading-tight">Trusted ESG<br/>Specialist</h4>
             </div>

             {/* Item 2 */}
             <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#5D4037] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <ShieldCheck className="w-10 h-10 text-[#5D4037]" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-bold text-[#2C1810] leading-tight">SME Finance<br/>Advisor</h4>
             </div>

             {/* Item 3 */}
             <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#5D4037] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Cpu className="w-10 h-10 text-[#5D4037]" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-bold text-[#2C1810] leading-tight">Digital Finance<br/>Officer</h4>
             </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-12 mt-12">
        <p className="text-xs font-bold text-[#BCAAA4] uppercase tracking-[0.2em]">Powered by FAHR AI TalentEngine</p>
      </footer>

    </div>
  );
};

export default CareerMobilityProfile;