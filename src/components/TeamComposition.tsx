
import React, { useState, useEffect } from "react";
import { brawlers as localBrawlers } from "@/data/brawlers";
import { compatibilityData } from "@/data/compatibilityData";
import { GameModeSelector } from "./team-composition/GameModeSelector";
import { BrawlerSelector } from "./team-composition/BrawlerSelector";
import { RecommendedTeams } from "./team-composition/RecommendedTeams";
import { SelectedTeamDisplay } from "./team-composition/SelectedTeamDisplay";
import { SynergyAnalysis } from "./team-composition/SynergyAnalysis";
import { SavedTeamsMenu } from "./team-composition/SavedTeamsMenu";
import { analyzeSynergy } from "@/utils/synergyAnalysis";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { fetchBrawlers } from "@/services/brawlStarsService";
import { AdvancedTeamAnalysis } from "./AdvancedTeamAnalysis";

export function TeamComposition() {
  const [selectedMode, setSelectedMode] = useState("gemGrab");
  const [selectedBrawlers, setSelectedBrawlers] = useState<number[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [brawlers, setBrawlers] = useState(localBrawlers);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch brawlers on component mount
  useEffect(() => {
    const loadBrawlers = async () => {
      setIsLoading(true);
      try {
        const brawlersList = await fetchBrawlers();
        if (brawlersList && brawlersList.length > 0) {
          setBrawlers(brawlersList);
          toast.success(`${brawlersList.length} Brawler geladen!`);
        } else {
          // Fallback to local brawlers if API returns empty
          toast.error("Konnte keine Brawler laden, verwende lokale Daten");
          setBrawlers(localBrawlers);
        }
      } catch (error) {
        console.error("Error loading brawlers:", error);
        toast.error("Fehler beim Laden der Brawler, verwende lokale Daten");
        setBrawlers(localBrawlers);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrawlers();
  }, []);

  const handleBrawlerSelect = (id: number) => {
    if (selectedBrawlers.includes(id)) {
      setSelectedBrawlers(selectedBrawlers.filter(bId => bId !== id));
    } else {
      if (selectedBrawlers.length < 3) {
        setSelectedBrawlers([...selectedBrawlers, id]);
        if (selectedBrawlers.length === 2) {
          toast.success("Team vollständig! Analyse verfügbar.");
        }
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

  const handleLoadTeam = (brawlerIds: number[], gameMode: string) => {
    // First update the game mode if different
    if (gameMode !== selectedMode) {
      setSelectedMode(gameMode);
    }
    
    // Then set the brawlers
    setSelectedBrawlers(brawlerIds.slice(0, 3)); // Only take up to 3 brawlers
    toast.success("Team geladen!");
  };

  const selectedBrawlerData = selectedBrawlers.map(id => 
    brawlers.find(b => b.id === id)!
  );
  
  const synergyData = analyzeSynergy(selectedBrawlerData);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Team-Zusammenstellungs-Analyse
        </h1>
        <p className="text-muted-foreground">
          Stelle das perfekte Team für jeden Spielmodus zusammen oder finde heraus, welche Brawler am besten zusammenarbeiten.
        </p>
      </div>

      <GameModeSelector 
        selectedMode={selectedMode} 
        onSelectMode={handleModeSelection} 
      />
      
      <Card className="brawl-card">
        <CardContent className="pt-6">
          <SavedTeamsMenu 
            selectedMode={selectedMode}
            selectedBrawlers={selectedBrawlers}
            onLoadTeam={handleLoadTeam}
          />
        </CardContent>
      </Card>

      <BrawlerSelector
        brawlers={brawlers}
        selectedBrawlers={selectedBrawlers}
        onSelectBrawler={handleBrawlerSelect}
        showRecommendations={showRecommendations}
        onToggleRecommendations={() => setShowRecommendations(!showRecommendations)}
        getCompatibility={getCompatibility}
        onResetSelection={resetSelections}
        isLoading={isLoading}
      />

      {selectedBrawlers.length >= 2 && (
        <SynergyAnalysis
          selectedBrawlers={selectedBrawlers}
          brawlers={brawlers}
          synergyData={synergyData}
        />
      )}
      
      {selectedBrawlers.length === 3 && synergyData && (
        <AdvancedTeamAnalysis
          selectedBrawlers={selectedBrawlers}
          brawlers={brawlers}
          synergyData={synergyData}
          gameMode={selectedMode}
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
