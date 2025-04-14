
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Star,
  Filter,
  Info
} from "lucide-react";
import { brawlers, brawlerRoles } from "@/data/brawlers";

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

const BrawlerCard = ({ id, name, role, rarity, image, selected, onClick, compatibility }: BrawlerCardProps) => {
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

const gameModes = [
  { id: "gemGrab", name: "Gem Grab", icon: Sparkles },
  { id: "brawlBall", name: "Brawl Ball", icon: Droplet },
  { id: "heist", name: "Heist", icon: Shield },
  { id: "bounty", name: "Bounty", icon: Star },
  { id: "siege", name: "Siege", icon: Gauge },
  { id: "hotZone", name: "Hot Zone", icon: Target }
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
  const [roleFilter, setRoleFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBrawlerSelect = (id: number) => {
    if (selectedBrawlers.includes(id)) {
      setSelectedBrawlers(selectedBrawlers.filter(bId => bId !== id));
    } else {
      if (selectedBrawlers.length < 3) {
        setSelectedBrawlers([...selectedBrawlers, id]);
      }
    }
  };

  const filteredBrawlers = useMemo(() => {
    return brawlers.filter(brawler => {
      const matchesRole = roleFilter === "all" || brawler.role === roleFilter;
      const matchesRarity = rarityFilter === "all" || brawler.rarity === rarityFilter;
      const matchesSearch = brawler.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesRarity && matchesSearch;
    });
  }, [roleFilter, rarityFilter, searchQuery]);

  const rarities = useMemo(() => {
    return Array.from(new Set(brawlers.map(b => b.rarity)));
  }, []);

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
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow">
              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {brawlerRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Rarity Filter */}
              <Select value={rarityFilter} onValueChange={setRarityFilter}>
                <SelectTrigger>
                  <Star className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  {rarities.map(rarity => (
                    <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search brawlers..."
                  className="w-full px-4 py-2 border border-border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredBrawlers.map(brawler => (
              <BrawlerCard
                key={brawler.id}
                id={brawler.id}
                name={brawler.name}
                role={brawler.role}
                rarity={brawler.rarity}
                image={brawler.image}
                selected={selectedBrawlers.includes(brawler.id)}
                onClick={() => handleBrawlerSelect(brawler.id)}
                compatibility={showRecommendations ? getCompatibility(brawler.id) : undefined}
              />
            ))}
            
            {filteredBrawlers.length === 0 && (
              <div className="col-span-full p-8 text-center">
                <Info className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No brawlers match your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setRoleFilter("all");
                    setRarityFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
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

      {selectedBrawlers.length > 0 && (
        <Card className="brawl-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brawl-blue" /> Your Selected Team
            </CardTitle>
            <CardDescription>
              Details of your selected brawlers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="abilities">Abilities</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedBrawlers.map(brawlerId => {
                    const brawler = brawlers.find(b => b.id === brawlerId)!;
                    return (
                      <div key={brawlerId} className="p-4 border border-border rounded-lg bg-secondary">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-3xl font-bold">{brawler.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-bold">{brawler.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{brawler.role}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>Health: {brawler.stats.health}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span>Damage: {brawler.stats.damage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            <span>Range: {brawler.stats.range}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>Speed: {brawler.stats.speed}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="abilities">
                <div className="space-y-6">
                  {selectedBrawlers.map(brawlerId => {
                    const brawler = brawlers.find(b => b.id === brawlerId)!;
                    return (
                      <div key={brawlerId} className="p-4 border border-border rounded-lg bg-secondary">
                        <h4 className="font-bold mb-3">{brawler.name}'s Abilities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 bg-card rounded-lg">
                            <Badge className="bg-blue-600 mb-2">Basic</Badge>
                            <h5 className="font-semibold mb-1">{brawler.abilities.basic}</h5>
                          </div>
                          <div className="p-3 bg-card rounded-lg">
                            <Badge className="bg-yellow-600 mb-2">Super</Badge>
                            <h5 className="font-semibold mb-1">{brawler.abilities.super}</h5>
                          </div>
                          <div className="p-3 bg-card rounded-lg">
                            <Badge className="bg-purple-600 mb-2">Gadget</Badge>
                            <h5 className="font-semibold mb-1">{brawler.abilities.gadget1}</h5>
                            {brawler.abilities.gadget2 && (
                              <h5 className="font-semibold mt-2 text-muted-foreground text-sm">{brawler.abilities.gadget2}</h5>
                            )}
                          </div>
                          <div className="p-3 bg-card rounded-lg md:col-span-3">
                            <Badge className="bg-green-600 mb-2">Star Power</Badge>
                            <div className="flex items-center gap-3 justify-between">
                              <h5 className="font-semibold">{brawler.abilities.starPower1}</h5>
                              {brawler.abilities.starPower2 && (
                                <h5 className="font-semibold text-muted-foreground">{brawler.abilities.starPower2}</h5>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3">Brawler</th>
                        <th className="text-center p-3">Health</th>
                        <th className="text-center p-3">Damage</th>
                        <th className="text-center p-3">Speed</th>
                        <th className="text-center p-3">Range</th>
                        <th className="text-center p-3">Role</th>
                        <th className="text-center p-3">Rarity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBrawlers.map(brawlerId => {
                        const brawler = brawlers.find(b => b.id === brawlerId)!;
                        return (
                          <tr key={brawlerId} className="border-b border-border hover:bg-muted/50">
                            <td className="p-3 font-medium">{brawler.name}</td>
                            <td className="p-3 text-center">{brawler.stats.health}</td>
                            <td className="p-3 text-center">{brawler.stats.damage}</td>
                            <td className="p-3 text-center">{brawler.stats.speed}</td>
                            <td className="p-3 text-center">{brawler.stats.range}</td>
                            <td className="p-3 text-center">{brawler.role}</td>
                            <td className="p-3 text-center">
                              <Badge variant="outline">{brawler.rarity}</Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
