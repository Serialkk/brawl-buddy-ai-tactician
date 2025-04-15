
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ReplayAnalysis } from "@/components/ReplayAnalysis";
import { TeamComposition } from "@/components/TeamComposition";
import { StrategyGuide } from "@/components/strategy-guide"; // Updated import path
import { OpponentPrediction } from "@/components/OpponentPrediction";
import { Dashboard } from "@/components/Dashboard";
import { Maps } from "@/components/Maps";
import { RealTimeStats } from "@/components/RealTimeStats";

const Index = () => {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {activeTab === "replay" && <ReplayAnalysis />}
        {activeTab === "team" && <TeamComposition />}
        {activeTab === "strategy" && <StrategyGuide />}
        {activeTab === "opponent" && <OpponentPrediction />}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "maps" && <Maps />}
        {activeTab === "stats" && <RealTimeStats />}
      </main>
    </div>
  );
};

export default Index;
