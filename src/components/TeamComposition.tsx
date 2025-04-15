
import React, { useState } from "react";
import { brawlers } from "@/data/brawlers";
import { compatibilityData } from "@/data/compatibilityData";
import { GameModeSelector } from "./team-composition/GameModeSelector";
import { BrawlerSelector } from "./team-composition/BrawlerSelector";
import { RecommendedTeams } from "./team-composition/RecommendedTeams";
import { SelectedTeamDisplay } from "./team-composition/SelectedTeamDisplay";
import { SynergyAnalysis } from "./team-composition/SynergyAnalysis";
import { analyzeSynergy } from "@/utils/synergyAnalysis";

export function TeamComposition() {
  const [selectedMode, setSelectedMode] = useState("gemGrab");
  const [selectedBrawlers, setSelectedBrawlers] = useState<number[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleBrawlerSelect = (id: number) => {
    if (selectedBrawlers.includes(id)) {
      setSelectedBrawlers(selectedBrawlers.filter(bId => bId !== id));
    } else {
      if (selectedBrawlers.length < 3) {
        setSelectedBrawlers([...selectedBrawlers, id]);
      }
    }
  };

  const getCompatibility = (id: number) => {
    if (!showRecommendations || selectedBrawlers.length === 0) return undefined;
    
    // Calculate compatibility based on recommended comps for the selected mode
    const recommendations = compatibilityData[selectedMode];
    
    let bestMatchScore = 0;
    recommendations.forEach(rec => {
      // Check how many of the selected brawlers are in this recommendation
      const selectedInRec = selectedBrawlers.filter(b => rec.comp.includes(b));
      if (selectedInRec.length > 0 && rec.comp.includes(id)) {
        const matchScore = (selectedInRec.length / selectedBrawlers.length) * 100;
        bestMatchScore = Math.max(bestMatchScore, matchScore);
      }
    });
    
    if (bestMatchScore === 0 && !selectedBrawlers.includes(id)) {
      return Math.floor(Math.random() * 40) + 30; // Random score between 30-70 for non-matches
    }
    
    return bestMatchScore;
  };

  const resetSelections = () => {
    setSelectedBrawlers([]);
    setShowRecommendations(false);
  };

  const handleModeSelection = (mode: string) => {
    setSelectedMode(mode);
    resetSelections();
  };

  const getRecommendedComps = () => {
    if (!selectedMode) return [];
    return compatibilityData[selectedMode] || [];
  };

  const selectedBrawlerData = selectedBrawlers.map(id => 
    brawlers.find(b => b.id === id)!
  );
  
  const synergyData = analyzeSynergy(selectedBrawlerData);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Team Composition Analyzer
        </h1>
        <p className="text-muted-foreground">
          Build the perfect team for any game mode or see which Brawlers work best together.
        </p>
      </div>

      <GameModeSelector 
        selectedMode={selectedMode} 
        onSelectMode={handleModeSelection} 
      />

      <BrawlerSelector
        brawlers={brawlers}
        selectedBrawlers={selectedBrawlers}
        onSelectBrawler={handleBrawlerSelect}
        showRecommendations={showRecommendations}
        onToggleRecommendations={() => setShowRecommendations(!showRecommendations)}
        getCompatibility={getCompatibility}
        onResetSelection={resetSelections}
      />

      {selectedBrawlers.length >= 2 && (
        <SynergyAnalysis
          selectedBrawlers={selectedBrawlers}
          brawlers={brawlers}
          synergyData={synergyData}
        />
      )}

      {selectedMode && (
        <RecommendedTeams
          selectedMode={selectedMode}
          recommendedComps={getRecommendedComps()}
          brawlers={brawlers}
        />
      )}

      <SelectedTeamDisplay
        selectedBrawlers={selectedBrawlers}
        brawlers={brawlers}
      />
    </div>
  );
}
