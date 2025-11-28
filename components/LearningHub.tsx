import React, { useState } from 'react';
import { ArrowLeft, Clock, Award, ChevronRight, PlayCircle, FileText, Sparkles, Filter, Bot, Target } from 'lucide-react';
import { LearningWallet } from '../types';

interface LearningHubProps {
  wallet: LearningWallet;
  onBack: () => void;
  onAskCoach?: () => void;
  onViewGap?: () => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  domain: 'Technical' | 'Behavioural' | 'Digital' | 'Leadership';
  credits: number;
  duration: string;
  progress?: number;
  status?: 'not-started' | 'ongoing' | 'completed';
}

const LearningHub: React.FC<LearningHubProps> = ({ wallet, onBack, onAskCoach, onViewGap }) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const recommendedCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced VAT Compliance (UAE)',
      description: 'Master the intricacies of UAE VAT laws, filing procedures, and common compliance pitfalls for finance professionals.',
      domain: 'Technical',
      credits: 30,
      duration: '4 weeks',
      status: 'not-started'
    },
    {
      id: '2',
      title: 'Financial Controls & Risk Awareness',
      description: 'Learn to design and implement robust internal controls to mitigate financial risks in SME environments.',
      domain: 'Technical',
      credits: 25,
      duration: '2 weeks',
      status: 'not-started'
    },
    {
      id: '3',
      title: 'Business Communication for Finance',
      description: 'Enhance your ability to communicate complex financial data to non-finance stakeholders effectively.',
      domain: 'Behavioural',
      credits: 20,
      duration: '1 week',
      status: 'not-started'
    },
    {
      id: '4',
      title: 'Digital Tools for Accountants',
      description: 'Introduction to modern cloud accounting software and automation tools transforming the industry.',
      domain: 'Digital',
      credits: 15,
      duration: '3 days',
      status: 'not-started'
    }
  ];

  const myCourses: Course[] = [
    {
      id: '101',
      title: 'Intro to AI in Finance',
      description: '',
      domain: 'Digital',
      credits: 15,
      duration: '2 weeks',
      progress: 65,
      status: 'ongoing'
    },
    {
      id: '102',
      title: 'Ethics in Accounting',
      description: '',
      domain: 'Behavioural',
      credits: 10,
      duration: '1 week',
      progress: 20,
      status: 'ongoing'
    },
    {
      id: '201',
      title: 'Excel Mastery 2024',
      description: '',
      domain: 'Digital',
      credits: 20,
      duration: '3 weeks',
      progress: 100,
      status: 'completed'
    },
    {
      id: '202',
      title: 'Basic VAT Principles',
      description: '',
      domain: 'Technical',
      credits: 15,
      duration: '2 weeks',
      progress: 100,
      status: 'completed'
    }
  ];

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'Technical': return 'bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]';
      case 'Digital': return 'bg-[#E3F2FD] text-[#0D47A1] border-[#BBDEFB]';
      case 'Behavioural': return 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]';
      case 'Leadership': return 'bg-[#F3E5F5] text-[#4A148C] border-[#E1BEE7]';
      default: return 'bg-[#F5F5F5] text-[#616161] border-[#E0E0E0]';
    }
  };

  const nextLevelCredits = 160; // Assuming Silver is at 160
  const creditsNeeded = nextLevelCredits - wallet.credits;
  const progressPercent = Math.min(100, (wallet.credits / nextLevelCredits) * 100);

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 ease-out pb-20">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#EBE0D3] text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <h2 className="text-2xl font-serif font-bold text-[#2C1810]">Your Learning Hub</h2>
        </div>

        <button 
          onClick={onAskCoach}
          className="flex items-center justify-center gap-2 bg-white border border-[#D4B996] hover:border-[#5D4037] text-[#5D4037] px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-all active:scale-95 hover:bg-[#FFF9F0]"
        >
          <Bot className="w-4 h-4" />
          Ask the AI Coach
        </button>
      </div>

      {/* Wallet & Progress Section */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#3E2723] rounded-xl p-6 md:p-8 text-white shadow-lg border border-[#5D4037] mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3CBA8] opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-[#D7CCC8] text-xs font-bold uppercase tracking-[0.1em] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD54F]" />
              Learning Wallet
            </h3>
            <div className="flex items-baseline gap-3 mb-1">
               <span className="text-4xl font-serif font-bold text-[#FFF9F0]">{wallet.credits}</span>
               <span className="text-[#BCAAA4]">Available Credits</span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-[#D7CCC8]">
                <span>Current: {wallet.level}</span>
                <span>Next: Silver</span>
              </div>
              <div className="w-full h-2.5 bg-[#5D4037] rounded-full overflow-hidden border border-[#5D4037]">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFD54F] to-[#FFA000] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-[#E3CBA8] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                You are <span className="text-[#FFF9F0] font-bold">{creditsNeeded} credits</span> away from Silver level
              </p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-24 bg-[#5D4037]"></div>
          
          <div className="flex flex-col justify-center min-w-[200px]">
             <div className="text-center p-4 rounded-lg bg-[#5D4037]/30 border border-[#5D4037] backdrop-blur-sm">
                <span className="block text-2xl font-serif font-bold text-[#FFD54F] mb-1">+15%</span>
                <span className="text-xs text-[#D7CCC8] uppercase tracking-wide">Bonus Multiplier</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recommended Learning Paths (Left Column) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#5D4037] uppercase tracking-wider">Recommended Learning Paths</h3>
            <button className="text-sm text-[#8D6E63] flex items-center gap-1 hover:text-[#5D4037] font-medium">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>

          <div className="space-y-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-5 border border-[#EBE0D3] shadow-sm hover:shadow-md hover:border-[#D4B996] transition-all group">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDomainColor(course.domain)}`}>
                        {course.domain}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#8D6E63] font-medium">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#2C1810] mb-2 group-hover:text-[#5D4037] transition-colors">{course.title}</h4>
                    <p className="text-sm text-[#5D4037] leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center gap-2">
                       <span className="inline-flex items-center gap-1 text-sm font-bold text-[#D84315]">
                          <Award className="w-4 h-4" />
                          {course.credits} Credits
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 min-w-[120px]">
                    <button className="bg-[#FFF9F0] hover:bg-[#5D4037] text-[#5D4037] hover:text-white border border-[#D4B996] hover:border-[#5D4037] px-4 py-2 rounded-lg text-sm font-bold transition-all w-full md:w-auto active:scale-95 shadow-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Learning (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Target Role Mini Card (Entry Point) */}
          <div className="bg-[#FFF3E0] rounded-xl p-4 border border-[#FFE0B2] shadow-sm">
             <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#E65100]" />
                <h3 className="text-xs font-bold text-[#E65100] uppercase tracking-wide">Target Role</h3>
             </div>
             <div className="mb-3">
               <h4 className="text-sm font-bold text-[#2C1810]">Senior Accountant</h4>
               <p className="text-xs text-[#8D6E63]">87% Match • 2 Major Gaps</p>
             </div>
             <button 
               onClick={onViewGap}
               className="w-full py-2 bg-white border border-[#FFCCBC] text-[#D84315] text-xs font-bold rounded-lg hover:bg-[#FBE9E7] transition-colors flex items-center justify-center gap-1"
             >
               View Skill Gap Analysis <ChevronRight className="w-3 h-3" />
             </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#EBE0D3] overflow-hidden sticky top-24">
            <div className="p-4 border-b border-[#EBE0D3] bg-[#FFF9F0] flex items-center justify-between">
              <h3 className="font-bold text-[#2C1810]">My Learning</h3>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-[#EBE0D3]">
              <button 
                onClick={() => setActiveTab('ongoing')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'ongoing' ? 'text-[#5D4037] border-b-2 border-[#5D4037] bg-white' : 'text-[#8D6E63] bg-[#FAFAFA] hover:bg-[#F5F5F5]'}`}
              >
                Ongoing
              </button>
              <button 
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'completed' ? 'text-[#5D4037] border-b-2 border-[#5D4037] bg-white' : 'text-[#8D6E63] bg-[#FAFAFA] hover:bg-[#F5F5F5]'}`}
              >
                Completed
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {myCourses.filter(c => c.status === activeTab).map((course) => (
                <div key={course.id} className="p-3 rounded-lg border border-[#EBE0D3] hover:bg-[#FFF9F0] transition-colors">
                  <h5 className="font-bold text-[#2C1810] text-sm mb-1 leading-snug">{course.title}</h5>
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#8D6E63]">
                     <span className={`w-2 h-2 rounded-full ${course.domain === 'Technical' ? 'bg-green-500' : course.domain === 'Digital' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
                     {course.domain}
                  </div>
                  
                  {activeTab === 'ongoing' && (
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold text-[#5D4037]">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-[#EFEBE9] rounded-full overflow-hidden">
                          <div className="h-full bg-[#5D4037] rounded-full" style={{ width: `${course.progress}%` }}></div>
                       </div>
                       <button className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#5D4037] hover:bg-[#4E342E] py-1.5 rounded transition-colors">
                          <PlayCircle className="w-3 h-3" />
                          Resume
                       </button>
                    </div>
                  )}

                  {activeTab === 'completed' && (
                    <button className="w-full mt-1 flex items-center justify-center gap-1.5 text-xs font-bold text-[#5D4037] bg-[#FFF9F0] border border-[#D4B996] hover:bg-[#E3CBA8] py-1.5 rounded transition-colors">
                      <FileText className="w-3 h-3" />
                      View Certificate
                    </button>
                  )}
                </div>
              ))}
              
              {myCourses.filter(c => c.status === activeTab).length === 0 && (
                 <div className="text-center py-8 text-sm text-[#8D6E63]">
                    No courses found.
                 </div>
              )}
            </div>
            
            <div className="p-3 bg-[#FFF9F0] border-t border-[#EBE0D3] text-center">
               <button className="text-xs font-bold text-[#5D4037] hover:underline flex items-center justify-center gap-1 mx-auto">
                 View All History <ChevronRight className="w-3 h-3" />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-xs font-bold text-[#BCAAA4] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <span className="w-1 h-1 rounded-full bg-[#BCAAA4]"></span>
          Powered by FAHR AI Talent Engine
          <span className="w-1 h-1 rounded-full bg-[#BCAAA4]"></span>
        </p>
      </footer>
    </div>
  );
};

export default LearningHub;
