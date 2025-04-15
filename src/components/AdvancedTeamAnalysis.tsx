import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

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

  const getGameModeBadgeColor = (gameMode: string) => {
    const modeColors: Record<string, string> = {
      "gemGrab": "blue",
      "brawlBall": "yellow",
      "showdown": "red",
      "bounty": "purple",
      "heist": "green",
      "hotZone": "red",
      "knockout": "purple",
      "duels": "yellow",
      "payload": "green"
    };
    
    return modeColors[gameMode] || "blue";
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
          <Badge variant={getGameModeBadgeColor(gameMode) as "blue" | "purple" | "yellow" | "red" | "green"}>
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
