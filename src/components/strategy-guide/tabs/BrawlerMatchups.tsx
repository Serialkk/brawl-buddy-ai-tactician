
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crosshair, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { matchups, getDefaultMatchups } from "../data/brawlers";

interface BrawlerMatchupsProps {
  brawler: string;
}

export const BrawlerMatchups: React.FC<BrawlerMatchupsProps> = ({ brawler }) => {
  // Verwende die vorhandenen Matchup-Daten oder Standardwerte für neue Brawler
  const brawlerMatchups = matchups[brawler as keyof typeof matchups] || getDefaultMatchups();

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crosshair className="h-5 w-5 text-brawl-red" /> {brawler}'s Matchups
        </CardTitle>
        <CardDescription>Learn which opponents to engage and which to avoid</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-border rounded-lg bg-secondary">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-green-500">
              <ThumbsUp className="h-4 w-4" /> Strong Against
            </h3>
            <div className="space-y-3">
              {brawlerMatchups.strong.map((enemy, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="font-bold text-sm">{enemy.charAt(0)}</span>
                    </div>
                    <span>{enemy}</span>
                  </div>
                  <Badge className="bg-green-600">Advantage</Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-secondary">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500">
              <ThumbsDown className="h-4 w-4" /> Weak Against
            </h3>
            <div className="space-y-3">
              {brawlerMatchups.weak.map((enemy, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="font-bold text-sm">{enemy.charAt(0)}</span>
                    </div>
                    <span>{enemy}</span>
                  </div>
                  <Badge className="bg-red-600">Disadvantage</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
