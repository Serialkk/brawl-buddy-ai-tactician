
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Sparkles, Droplet, Shield, Star, Gauge, Target } from "lucide-react";

export const gameModes = [
  { id: "gemGrab", name: "Gem Grab", icon: Sparkles },
  { id: "brawlBall", name: "Brawl Ball", icon: Droplet },
  { id: "heist", name: "Heist", icon: Shield },
  { id: "bounty", name: "Bounty", icon: Star },
  { id: "siege", name: "Siege", icon: Gauge },
  { id: "hotZone", name: "Hot Zone", icon: Target }
];

interface GameModeSelectorProps {
  selectedMode: string;
  onSelectMode: (mode: string) => void;
}

export const GameModeSelector = ({ selectedMode, onSelectMode }: GameModeSelectorProps) => {
  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-brawl-yellow" /> Game Mode
        </CardTitle>
        <CardDescription>Select the game mode you want to play</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {gameModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Button
                key={mode.id}
                variant={selectedMode === mode.id ? "default" : "outline"}
                className={`flex flex-col h-auto py-3 px-3 ${
                  selectedMode === mode.id ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""
                }`}
                onClick={() => onSelectMode(mode.id)}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{mode.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
