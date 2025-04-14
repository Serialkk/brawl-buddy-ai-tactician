
import React from "react";
import { Badge } from "@/components/ui/badge";

interface BrawlerCardProps {
  id: number;
  name: string;
  role: string;
  rarity: string;
  image: string;
  selected: boolean;
  onClick: () => void;
  compatibility?: number;
}

export const BrawlerCard = ({ 
  id, 
  name, 
  role, 
  rarity, 
  image, 
  selected, 
  onClick, 
  compatibility 
}: BrawlerCardProps) => {
  const rarityColors: Record<string, string> = {
    "Starting Brawler": "bg-gray-600",
    "Trophy Road": "bg-blue-600",
    "Rare": "bg-green-600",
    "Super Rare": "bg-teal-600",
    "Epic": "bg-purple-600",
    "Mythic": "bg-red-600",
    "Legendary": "bg-yellow-500",
    "Chromatic": "bg-gradient-to-r from-blue-500 to-purple-500"
  };

  return (
    <div 
      className={`brawl-card cursor-pointer transition-all ${
        selected 
          ? "ring-2 ring-brawl-purple" 
          : "hover:scale-105"
      }`}
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-secondary">
        {compatibility !== undefined && (
          <Badge className={`absolute top-2 right-2 z-10 ${
            compatibility > 80 
              ? "bg-green-500" 
              : compatibility > 50 
                ? "bg-brawl-yellow" 
                : "bg-brawl-red"
          }`}>
            {compatibility}% Match
          </Badge>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-gray-800/50 flex items-center justify-center">
            <span className="text-5xl font-bold">{name.charAt(0)}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold">{name}</h3>
          <Badge className={rarityColors[rarity] || "bg-gray-600"}>
            {rarity.split(" ")[0]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};
