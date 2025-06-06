
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Gem, Target, Shield, Star, Circle, Castle, Flag, Clock, Sword, Crown } from "lucide-react";

export const gameModes = [
  { id: "gemGrab", name: "Gem Grab", icon: Gem },
  { id: "brawlBall", name: "Brawl Ball", icon: Target },
  { id: "heist", name: "Heist", icon: Shield },
  { id: "bounty", name: "Bounty", icon: Star },
  { id: "siege", name: "Siege", icon: Castle },
  { id: "hotZone", name: "Hot Zone", icon: Circle },
  { id: "knockout", name: "Knockout", icon: Flag },
  { id: "showdown", name: "Showdown", icon: Crown },
  { id: "duels", name: "Duels", icon: Sword },
  { id: "wipeout", name: "Wipeout", icon: Clock }
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
          <Trophy className="h-5 w-5 text-brawl-yellow" /> Spielmodus
        </CardTitle>
        <CardDescription>Wähle den Spielmodus aus, in dem du spielen möchtest</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
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
