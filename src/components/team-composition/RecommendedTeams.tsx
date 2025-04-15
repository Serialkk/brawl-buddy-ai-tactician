
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Zap } from "lucide-react";
import { Brawler } from "@/data/brawlers";
import { gameModes } from "./GameModeSelector";

export interface TeamRecommendation {
  comp: number[];
  score: number;
  synergy: string;
}

interface RecommendedTeamsProps {
  selectedMode: string;
  recommendedComps: TeamRecommendation[];
  brawlers: Brawler[];
}

export const RecommendedTeams = ({ selectedMode, recommendedComps, brawlers }: RecommendedTeamsProps) => {
  if (!selectedMode) return null;
  
  // Find the selected game mode or use a fallback
  const selectedGameMode = gameModes.find(m => m.id === selectedMode);
  const gameModeName = selectedGameMode ? selectedGameMode.name : selectedMode;

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-brawl-yellow" /> Top Teams for {gameModeName}
        </CardTitle>
        <CardDescription>
          Meta-analyzed team compositions with the highest win rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendedComps.map((comp, idx) => (
            <div key={idx} className="p-4 border border-border rounded-lg bg-secondary">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className={`h-5 w-5 ${
                    idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : "text-amber-800"
                  }`} />
                  <h3 className="font-bold">Team #{idx + 1}</h3>
                </div>
                <Badge className="bg-green-500">{comp.score}% Win Rate</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {comp.comp.map(brawlerId => {
                  // Find the brawler with null check
                  const brawler = brawlers.find(b => b.id === brawlerId);
                  
                  // If brawler not found, show placeholder
                  if (!brawler) {
                    return (
                      <div key={brawlerId} className="p-3 bg-card rounded-lg text-center">
                        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl font-bold">?</span>
                        </div>
                        <h4 className="font-bold">Unknown</h4>
                        <p className="text-xs text-muted-foreground">Missing</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div 
                      key={brawlerId} 
                      className="p-3 bg-card rounded-lg text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl font-bold">{brawler.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold">{brawler.name}</h4>
                      <p className="text-xs text-muted-foreground">{brawler.role}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-brawl-purple" />
                <span>Synergy: {comp.synergy}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
