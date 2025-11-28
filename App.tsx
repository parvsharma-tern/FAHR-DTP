import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SkillCard from './components/SkillCard';
import LearningWallet from './components/LearningWallet';
import SkillDrillDown from './components/SkillDrillDown';
import CareerMobilityProfile from './components/CareerMobilityProfile';
import LearningHub from './components/LearningHub';
import AICoach from './components/AICoach';
import TargetRoleGap from './components/TargetRoleGap';
import { UserProfile, SkillDomain, LearningWallet as LearningWalletType } from './types';
import { Code, Users, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  // dashboard | drilldown | careermobility | learning-hub | ai-coach | target-role-gap
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedDomain, setSelectedDomain] = useState<SkillDomain | null>(null);

  // Mock Data
  const user: UserProfile = {
    name: 'Ahmed Khan',
    role: 'Accountant',
    organization: 'Small Finance Co.',
    location: 'Sharjah, UAE',
    lastUpdated: 'Today'
  };

  const wallet: LearningWalletType = {
    level: 'Bronze',
    credits: 120
  };

  const [skills, setSkills] = useState<SkillDomain[]>([]);

  // Simulate data fetching to show "alive" state
  useEffect(() => {
    const mockSkills: SkillDomain[] = [
      {
        id: '1',
        name: 'Technical Skills',
        score: 85,
        level: 'Advanced',
        trend: 'stable',
        icon: <Code className="w-6 h-6" />
      },
      {
        id: '2',
        name: 'Behavioural Skills',
        score: 72,
        level: 'Proficient',
        trend: 'up',
        icon: <Users className="w-6 h-6" />
      },
      {
        id: '3',
        name: 'Digital Literacy',
        score: 64,
        level: 'Developing',
        trend: 'up',
        icon: <Cpu className="w-6 h-6" />
      },
      {
        id: '4',
        name: 'Leadership Skills',
        score: 45,
        level: 'Developing',
        trend: 'down',
        icon: <ShieldCheck className="w-6 h-6" />
      }
    ];

    setSkills(mockSkills);
  }, []);

  // Handlers
  const handleSkillClick = (skill: SkillDomain) => {
    setSelectedDomain(skill);
    setCurrentView('drilldown');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setTimeout(() => setSelectedDomain(null), 300); 
  };

  const handleViewReport = () => {
    setCurrentView('careermobility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartUpskilling = () => {
    setCurrentView('learning-hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskCoach = () => {
    setCurrentView('ai-coach');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleViewSkillGap = () => {
    setCurrentView('target-role-gap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // If in career mobility view, render that component directly (it has its own header)
  if (currentView === 'careermobility') {
    return <CareerMobilityProfile onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col font-sans selection:bg-[#E3CBA8]">
      <Header user={user} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {currentView === 'dashboard' ? (
          <>
            {/* Welcome Section / Context */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-[#2C1810]">Talent Dashboard</h2>
                  <p className="text-[#8D6E63] font-medium">Real-time skills analysis and learning opportunities.</p>
                </div>
                
                <button 
                  onClick={handleAskCoach}
                  className="group flex items-center justify-center gap-2 bg-white border border-[#D4B996] hover:border-[#5D4037] text-[#5D4037] px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-all active:scale-95 hover:bg-[#FFF9F0]"
                >
                  <Sparkles className="w-4 h-4 text-[#D4B996] group-hover:text-[#5D4037] transition-colors" />
                  Ask the AI Coach
                </button>
              </div>
            </section>

            {/* Learning Wallet */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <LearningWallet 
                wallet={wallet} 
                onStartUpskilling={handleStartUpskilling}
              />
            </section>

            {/* Core Skills Grid */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="flex items-center justify-between mb-6 border-b border-[#E6D5C3] pb-2">
                 <h3 className="text-lg font-bold text-[#5D4037] uppercase tracking-wider">Core Skill Domains</h3>
                 <button 
                    onClick={handleViewReport}
                    className="text-sm text-[#5D4037] hover:text-[#2C1810] font-bold underline decoration-[#D4B996] hover:decoration-[#8D6E63] underline-offset-4 transition-all"
                 >
                   View Detailed Report
                 </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map(skill => (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    onClick={handleSkillClick}
                  />
                ))}
              </div>
            </section>
            
             {/* Footer info (GovTech standard) */}
            <footer className="pt-12 mt-4 text-center pb-8 animate-in fade-in duration-700">
              <p className="text-xs font-bold text-[#BCAAA4] uppercase tracking-[0.2em]">
                Powered by FAHR AI Talent Engine
              </p>
            </footer>
          </>
        ) : (
          /* Drill Down View */
          currentView === 'drilldown' && selectedDomain ? (
            <SkillDrillDown 
              domain={selectedDomain} 
              onBack={handleBack} 
            />
          ) : currentView === 'learning-hub' ? (
            /* Learning Hub View */
            <LearningHub 
              wallet={wallet}
              onBack={handleBack}
              onAskCoach={handleAskCoach}
              onViewGap={handleViewSkillGap}
            />
          ) : currentView === 'ai-coach' ? (
            /* AI Coach View */
            <AICoach 
              user={user}
              skills={skills}
              wallet={wallet}
              onBack={handleBack}
              onViewGap={handleViewSkillGap}
            />
          ) : currentView === 'target-role-gap' ? (
            /* Target Role Gap Analysis View */
            <TargetRoleGap 
              user={user}
              wallet={wallet}
              onBack={handleBack}
            />
          ) : null
        )}

      </main>
    </div>
  );
};

export default App;
