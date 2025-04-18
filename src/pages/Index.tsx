
import { useState } from 'react';
import { lazyLoad } from '@/utils/lazyLoad';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Navigation = lazyLoad(() => import('@/components/Navigation'));
const Dashboard = lazyLoad(() => import('@/components/Dashboard'));
const TeamComposition = lazyLoad(() => import('@/components/TeamComposition'));
const RealTimeStats = lazyLoad(() => import('@/components/RealTimeStats'));
const ReplayAnalysis = lazyLoad(() => import('@/components/ReplayAnalysis'));
const OpponentPrediction = lazyLoad(() => import('@/components/OpponentPrediction'));
const AdvancedTeamAnalysis = lazyLoad(() => import('@/components/AdvancedTeamAnalysis'));
const Maps = lazyLoad(() => import('@/components/Maps'));
const StrategyGuide = lazyLoad(() => import('@/components/strategy-guide/StrategyGuide'));

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SidebarProvider>
      <div 
        className="flex h-screen w-full bg-cover bg-center bg-no-repeat relative" 
        style={{
          backgroundImage: `url('/lovable-uploads/5016b625-cdd3-4908-8393-6a3060a129f5.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto p-6 relative z-10">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'team' && <TeamComposition />}
          {activeTab === 'maps' && <Maps />}
          {activeTab === 'strategy' && <StrategyGuide />}
          {activeTab === 'stats' && <RealTimeStats />}
          {activeTab === 'replay' && <ReplayAnalysis />}
          {activeTab === 'opponent' && <OpponentPrediction />}
          {activeTab === 'analysis' && <AdvancedTeamAnalysis 
            selectedBrawlers={[]} 
            brawlers={[]}
            synergyData={{
              overallScore: 0,
              strengths: [],
              weaknesses: []
            }}
            gameMode="gemGrab"
          />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
