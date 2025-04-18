
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
const EventRotation = lazyLoad(() => import('@/components/EventRotation/EventRotation'));

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Background and overlay */}
        <div 
          className="fixed inset-0 z-0" 
          style={{
            backgroundImage: `url('/lovable-uploads/5016b625-cdd3-4908-8393-6a3060a129f5.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.85
          }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="fixed inset-0 z-0 bg-black/60" />
        
        {/* Main content */}
        <div className="flex w-full h-screen relative z-10">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-auto p-6">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'team' && <TeamComposition />}
            {activeTab === 'maps' && <Maps />}
            {activeTab === 'strategy' && <StrategyGuide />}
            {activeTab === 'stats' && <RealTimeStats />}
            {activeTab === 'replay' && <ReplayAnalysis />}
            {activeTab === 'opponent' && <OpponentPrediction />}
            {activeTab === 'events' && <EventRotation />}
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
      </div>
    </SidebarProvider>
  );
};

export default Index;
