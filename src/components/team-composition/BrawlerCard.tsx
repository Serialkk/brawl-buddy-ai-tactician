
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    
  // Generate better placeholder images with unique parameters based on brawler name
  const nameForPlaceholder = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const placeholderUrls = [
    `https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&seed=${nameForPlaceholder}`,
    `https://images.unsplash.com/photo-1501286353178-1ec881214838?w=200&h=200&fit=crop&seed=${nameForPlaceholder}`,
    `https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=200&h=200&fit=crop&seed=${nameForPlaceholder}`,
    `https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=200&h=200&fit=crop&seed=${nameForPlaceholder}`
  ];
  
  // Use hash of brawler name to select a consistent image for each brawler
  const placeholderIndex = Math.abs(nameForPlaceholder.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0) % placeholderUrls.length);
  
  const placeholderImage = placeholderUrls[placeholderIndex];
  
  // Try to use the provided image first, then fallback to a placeholder
  const brawlerImageUrl = image || `https://api.brawlers-assets.com/${nameForPlaceholder}.png` || placeholderImage;
  
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
          {!imageError ? (
            <OptimizedImage 
              src={brawlerImageUrl}
              fallback={placeholderImage}
              alt={name}
              className="object-contain h-full w-full p-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <Avatar className="w-3/4 h-3/4 border-4 border-secondary/40 shadow-xl">
              <AvatarFallback className="bg-secondary text-4xl font-bold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
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
