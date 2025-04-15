
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedTeamAnalysisProps {
  selectedBrawlers: number[];
  brawlers: any[];
  synergyData: any;
  gameMode: string;
}

export function AdvancedTeamAnalysis({ selectedBrawlers, brawlers, synergyData, gameMode }: AdvancedTeamAnalysisProps) {
  if (!synergyData) {
    return null;
  }

  const { overallScore, strengths, weaknesses } = synergyData;

  const getGameModeBadgeClass = (gameMode: string) => {
    const modeColors: Record<string, string> = {
      "gemGrab": "bg-brawl-blue/20 text-brawl-blue",
      "brawlBall": "bg-brawl-yellow/20 text-brawl-yellow",
      "showdown": "bg-brawl-red/20 text-brawl-red",
      "bounty": "bg-brawl-purple/20 text-brawl-purple",
      "heist": "bg-brawl-blue/20 text-brawl-blue",
      "hotZone": "bg-brawl-red/20 text-brawl-red",
      "knockout": "bg-brawl-purple/20 text-brawl-purple",
      "duels": "bg-brawl-yellow/20 text-brawl-yellow",
      "payload": "bg-brawl-blue/20 text-brawl-blue"
    };
    
    return modeColors[gameMode] || "bg-brawl-blue/20 text-brawl-blue";
  };

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brawl-blue" /> Erweiterte Team-Analyse
        </CardTitle>
        <CardDescription>
          Detaillierte Einblicke in die Stärken und Schwächen deines Teams.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Gesamt-Synergie-Bewertung:</h3>
          <Badge variant="outline" className={cn(getGameModeBadgeClass(gameMode))}>
            {overallScore}%
          </Badge>
        </div>

        <div>
          <h4 className="text-md font-semibold">Stärken:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {strengths.map((strength: string, index: number) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold">Schwächen:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {weaknesses.map((weakness: string, index: number) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdvancedTeamAnalysis;
