
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";

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
  const [imageError, setImageError] = useState(false);
  
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

  const compatibilityColor = compatibility !== undefined 
    ? compatibility > 80 
      ? "bg-green-500" 
      : compatibility > 50 
        ? "bg-brawl-yellow" 
        : "bg-brawl-red"
    : "";
    
  // Use initial as fallback when no image is available
  const getBrawlerInitial = () => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div 
      className={cn(
        "brawl-card cursor-pointer transition-all transform hover:scale-105",
        selected && "ring-2 ring-brawl-purple shadow-lg shadow-brawl-purple/20"
      )}
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden rounded-t-xl">
        {compatibility !== undefined && (
          <Badge className={`absolute top-2 right-2 z-10 ${compatibilityColor}`}>
            {compatibility}% Match
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-br from-brawl-blue/10 to-brawl-purple/20 z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-3xl font-bold text-foreground/70">{getBrawlerInitial()}</span>
            </div>
          ) : (
            <OptimizedImage 
              src={image || `/brawlers/${name.toLowerCase().replace(/\s+/g, '-')}.png`}
              fallback={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="40" text-anchor="middle" dy=".3em" fill="currentColor">${getBrawlerInitial()}</text></svg>`}
              alt={name}
              className="object-contain h-full w-full p-2"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        {selected && (
          <div className="absolute inset-0 bg-brawl-purple/10 z-0 animate-pulse" />
        )}
      </div>
      
      <div className="p-3 relative z-20">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold truncate">{name}</h3>
          <Badge variant="outline" className={cn("shrink-0", rarityColors[rarity] || "bg-gray-600")}>
            {rarity.split(" ")[0]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{role}</p>
      </div>
    </div>
  );
}
