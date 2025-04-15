
import { useState, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { DefaultLoadingComponent } from "@/utils/lazyLoad";
import { useResponsive } from "@/hooks/useResponsive";

// Lazy load all tab components
const LazyReplayAnalysis = lazy(() => import("@/components/ReplayAnalysis").then(module => ({ default: module.ReplayAnalysis })));
const LazyTeamComposition = lazy(() => import("@/components/TeamComposition").then(module => ({ default: module.TeamComposition })));
const LazyStrategyGuide = lazy(() => import("@/components/strategy-guide").then(module => ({ default: module.default })));
const LazyOpponentPrediction = lazy(() => import("@/components/OpponentPrediction").then(module => ({ default: module.OpponentPrediction })));
const LazyDashboard = lazy(() => import("@/components/Dashboard").then(module => ({ default: module.Dashboard })));
const LazyMaps = lazy(() => import("@/components/Maps").then(module => ({ default: module.Maps })));
const LazyRealTimeStats = lazy(() => import("@/components/RealTimeStats").then(module => ({ default: module.RealTimeStats })));

const TabContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <Suspense fallback={<DefaultLoadingComponent />}>
      {activeTab === "replay" && <LazyReplayAnalysis />}
      {activeTab === "team" && <LazyTeamComposition />}
      {activeTab === "strategy" && <LazyStrategyGuide />}
      {activeTab === "opponent" && <LazyOpponentPrediction />}
      {activeTab === "dashboard" && <LazyDashboard />}
      {activeTab === "maps" && <LazyMaps />}
      {activeTab === "stats" && <LazyRealTimeStats />}
    </Suspense>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("team");
  const { md } = useResponsive();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className={`flex-1 p-4 ${md ? 'p-8' : 'p-4'} overflow-auto`}>
        <TabContent activeTab={activeTab} />
      </main>
    </div>
  );
};

export default Index;
