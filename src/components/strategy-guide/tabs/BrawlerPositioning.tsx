
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Target, Shield, MoveHorizontal, MoveVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PositioningMap } from "../components/PositioningMap";
import { positioningTips, mapTips, getDefaultPositioningTip, getDefaultMapTip } from "../data/brawlers";

interface BrawlerPositioningProps {
  brawler: string;
}

export const BrawlerPositioning: React.FC<BrawlerPositioningProps> = ({ brawler }) => {
  // Verwende die vorhandenen Positionierungstipps oder Standardwerte für neue Brawler
  const positioningTip = positioningTips[brawler as keyof typeof positioningTips] || getDefaultPositioningTip(brawler);
  const mapTip = mapTips[brawler as keyof typeof mapTips] || getDefaultMapTip(brawler);

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-brawl-green" /> Positioning Guide
        </CardTitle>
        <CardDescription>Optimal positioning for {brawler}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <PositioningMap brawlerName={brawler} />
          <div className="text-center mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Recommended position for {brawler} (purple) with teammates (blue) and control points (yellow)
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-brawl-purple"></div>
                <span>You</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-brawl-blue/50"></div>
                <span>Teammates</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-brawl-yellow/70"></div>
                <span>Objective</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-700/30"></div>
                <span>Bushes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-secondary">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Map className="h-4 w-4 text-brawl-yellow" /> Positioning Strategy
            </h3>
            <p>{positioningTip}</p>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-secondary">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-brawl-red" /> Range Considerations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                <MoveHorizontal className="h-5 w-5 text-brawl-blue" />
                <span className="font-medium text-sm">Short Range</span>
                {(["Bull", "El Primo", "Rosa", "Shelly"].includes(brawler)) && 
                  <Badge className="bg-green-600">Optimal</Badge>}
              </div>
              <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                <MoveVertical className="h-5 w-5 text-brawl-purple" />
                <span className="font-medium text-sm">Mid Range</span>
                {(["Nita", "Poco", "Jessie"].includes(brawler)) && 
                  <Badge className="bg-green-600">Optimal</Badge>}
              </div>
              <div className="flex flex-col items-center gap-1 p-2 border border-border rounded bg-background">
                <Target className="h-5 w-5 text-brawl-red" />
                <span className="font-medium text-sm">Long Range</span>
                {(["Colt", "Brock", "Rico", "Barley", "Dynamike"].includes(brawler)) && 
                  <Badge className="bg-green-600">Optimal</Badge>}
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-secondary">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-brawl-green" /> Map Preferences
            </h3>
            <p>{mapTip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
