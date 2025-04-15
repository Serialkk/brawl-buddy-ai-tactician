
import { useState } from 'react';
import { lazyLoad } from '@/utils/lazyLoad';

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
    <div className="flex h-screen">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'team' && <TeamComposition />}
        {activeTab === 'maps' && <Maps />}
        {activeTab === 'strategy' && <StrategyGuide />}
        {activeTab === 'stats' && <RealTimeStats />}
        {activeTab === 'replay' && <ReplayAnalysis />}
        {activeTab === 'opponent' && <OpponentPrediction />}
        {activeTab === 'analysis' && <AdvancedTeamAnalysis />}
      </main>
    </div>
  );
};

export default Index;
