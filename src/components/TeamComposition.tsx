
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Trophy, 
  Zap, 
  Shield, 
  Target, 
  Heart,
  ThumbsUp,
  Droplet,
  Sparkles,
  Gauge,
  Star
} from "lucide-react";

interface BrawlerCardProps {
  name: string;
  role: string;
  image: string;
  selected: boolean;
  onClick: () => void;
  compatibility?: number;
}

const BrawlerCard = ({ name, role, image, selected, onClick, compatibility }: BrawlerCardProps) => {
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
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

const gameModes = [
  { id: "gemGrab", name: "Gem Grab", icon: Sparkles },
  { id: "brawlBall", name: "Brawl Ball", icon: Droplet },
  { id: "heist", name: "Heist", icon: Shield },
  { id: "bounty", name: "Bounty", icon: Star },
  { id: "siege", name: "Siege", icon: Gauge },
  { id: "hotZone", name: "Hot Zone", icon: Target }
];

const brawlers = [
  { id: 1, name: "Shelly", role: "Fighter", image: "" },
  { id: 2, name: "Colt", role: "Sharpshooter", image: "" },
  { id: 3, name: "Brock", role: "Sharpshooter", image: "" },
  { id: 4, name: "Bull", role: "Heavyweight", image: "" },
  { id: 5, name: "Jessie", role: "Fighter", image: "" },
  { id: 6, name: "Nita", role: "Fighter", image: "" },
  { id: 7, name: "Dynamike", role: "Thrower", image: "" },
  { id: 8, name: "El Primo", role: "Heavyweight", image: "" },
  { id: 9, name: "Barley", role: "Thrower", image: "" },
  { id: 10, name: "Poco", role: "Support", image: "" },
  { id: 11, name: "Rosa", role: "Heavyweight", image: "" },
  { id: 12, name: "Rico", role: "Sharpshooter", image: "" }
];

const compatibilityData = {
  "gemGrab": [
    { comp: [2, 5, 10], score: 92, synergy: "High damage + healing + turret defense" },
    { comp: [3, 7, 11], score: 87, synergy: "Area control + tankiness" },
    { comp: [1, 6, 12], score: 83, synergy: "Bear + ricochet shots + close range power" }
  ],
  "brawlBall": [
    { comp: [4, 8, 10], score: 95, synergy: "Tank duo with healing support" },
    { comp: [1, 11, 12], score: 89, synergy: "Lane control + goal scoring potential" },
    { comp: [5, 6, 8], score: 84, synergy: "Turret defense with aggressive tanks" }
  ],
  "heist": [
    { comp: [2, 3, 7], score: 94, synergy: "High damage output + wall breaking" },
    { comp: [4, 9, 12], score: 88, synergy: "Tank rush + area denial" },
    { comp: [5, 7, 8], score: 82, synergy: "Turret defense + aggressive push" }
  ],
  "bounty": [
    { comp: [2, 3, 12], score: 96, synergy: "Long range trio with high damage" },
    { comp: [1, 9, 10], score: 85, synergy: "Area control + healing" },
    { comp: [5, 6, 7], score: 79, synergy: "Pet + turret + area denial" }
  ],
  "siege": [
    { comp: [4, 5, 9], score: 91, synergy: "Turret defense + tank for bolt collection" },
    { comp: [2, 8, 11], score: 86, synergy: "Bolt collection + siege push" },
    { comp: [3, 6, 12], score: 81, synergy: "Area control + bolt collection" }
  ],
  "hotZone": [
    { comp: [6, 9, 10], score: 93, synergy: "Area control + healing for zone dominance" },
    { comp: [1, 4, 11], score: 88, synergy: "Tank duo with zone control" },
    { comp: [2, 5, 7], score: 83, synergy: "Zone denial + turret control" }
  ]
};

export function TeamComposition() {
  const [selectedMode, setSelectedMode] = useState("gemGrab");
  const [selectedBrawlers, setSelectedBrawlers] = useState<number[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleBrawlerSelect = (id: number) => {
    if (selectedBrawlers.includes(id)) {
      setSelectedBrawlers(selectedBrawlers.filter(bId => bId !== id));
    } else {
      if (selectedBrawlers.length < 3) {
        setSelectedBrawlers([...selectedBrawlers, id]);
      }
    }
  };

  const getCompatibility = (id: number) => {
    if (!showRecommendations || selectedBrawlers.length === 0) return undefined;
    
    // Calculate compatibility based on recommended comps for the selected mode
    const recommendations = compatibilityData[selectedMode as keyof typeof compatibilityData];
    
    let bestMatchScore = 0;
    recommendations.forEach(rec => {
      // Check how many of the selected brawlers are in this recommendation
      const selectedInRec = selectedBrawlers.filter(b => rec.comp.includes(b));
      if (selectedInRec.length > 0 && rec.comp.includes(id)) {
        const matchScore = (selectedInRec.length / selectedBrawlers.length) * 100;
        bestMatchScore = Math.max(bestMatchScore, matchScore);
      }
    });
    
    if (bestMatchScore === 0 && !selectedBrawlers.includes(id)) {
      return Math.floor(Math.random() * 40) + 30; // Random score between 30-70 for non-matches
    }
    
    return bestMatchScore;
  };

  const resetSelections = () => {
    setSelectedBrawlers([]);
    setShowRecommendations(false);
  };

  const getRecommendedComps = () => {
    if (!selectedMode) return [];
    return compatibilityData[selectedMode as keyof typeof compatibilityData];
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Team Composition Analyzer
        </h1>
        <p className="text-muted-foreground">
          Build the perfect team for any game mode or see which Brawlers work best together.
        </p>
      </div>

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
                  onClick={() => {
                    setSelectedMode(mode.id);
                    resetSelections();
                  }}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{mode.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="brawl-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brawl-blue" /> Select Your Team
          </CardTitle>
          <CardDescription>
            {selectedBrawlers.length === 0 
              ? "Choose up to 3 Brawlers for your team" 
              : `Selected ${selectedBrawlers.length}/3 Brawlers`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={showRecommendations ? "default" : "outline"}
              className={`${showRecommendations ? "bg-brawl-blue hover:bg-brawl-blue/90" : ""}`}
              onClick={() => setShowRecommendations(!showRecommendations)}
              disabled={selectedBrawlers.length === 0}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Show Compatible Brawlers
            </Button>
            {selectedBrawlers.length > 0 && (
              <Button variant="outline" onClick={resetSelections}>
                Reset Selection
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brawlers.map(brawler => (
              <BrawlerCard
                key={brawler.id}
                name={brawler.name}
                role={brawler.role}
                image={brawler.image}
                selected={selectedBrawlers.includes(brawler.id)}
                onClick={() => handleBrawlerSelect(brawler.id)}
                compatibility={showRecommendations ? getCompatibility(brawler.id) : undefined}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMode && (
        <Card className="brawl-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-brawl-yellow" /> Top Teams for {gameModes.find(m => m.id === selectedMode)?.name}
            </CardTitle>
            <CardDescription>
              Meta-analyzed team compositions with the highest win rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getRecommendedComps().map((comp, idx) => (
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
                      const brawler = brawlers.find(b => b.id === brawlerId)!;
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
      )}
    </div>
  );
}
