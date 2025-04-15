import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Search, Filter, Info, Award, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrawlCard, BrawlBadge, GradientText } from "@/components/ui/brawl-classes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useGameData } from "@/contexts/GameDataContext";
import { useResponsive } from "@/hooks/useResponsive";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Statische Fallback-Daten für den Fall, dass die API fehlschlägt
const gameModesWithMaps = [
  { 
    name: "Gem Grab", 
    color: "blue",
    icon: "💎",
    maps: [
      { name: "Hard Rock Mine", environment: "Mine", size: "Medium", releaseDate: "2017-06-15" },
      { name: "Crystal Arcade", environment: "Arcade", size: "Medium", releaseDate: "2019-09-18" },
      { name: "Undermine", environment: "Mine", size: "Large", releaseDate: "2018-12-05" },
      { name: "Minecart Madness", environment: "Mine", size: "Medium", releaseDate: "2019-03-27" },
      { name: "Deathcap Trap", environment: "Mushroom", size: "Small", releaseDate: "2020-01-15" }
    ]
  },
  { 
    name: "Brawl Ball", 
    color: "yellow",
    icon: "⚽",
    maps: [
      { name: "Backyard Bowl", environment: "Stadium", size: "Medium", releaseDate: "2017-06-15" },
      { name: "Super Stadium", environment: "Stadium", size: "Large", releaseDate: "2018-08-22" },
      { name: "Pinhole Punt", environment: "Stadium", size: "Small", releaseDate: "2020-02-10" },
      { name: "Triple Dribble", environment: "Stadium", size: "Medium", releaseDate: "2019-01-30" },
      { name: "Sunny Soccer", environment: "Stadium", size: "Medium", releaseDate: "2021-03-15" }
    ]
  },
  { 
    name: "Showdown", 
    color: "red",
    icon: "💀",
    maps: [
      { name: "Skull Creek", environment: "Wild West", size: "Large", releaseDate: "2017-06-15" },
      { name: "Feast or Famine", environment: "Jungle", size: "Large", releaseDate: "2017-12-07" },
      { name: "Stormy Plains", environment: "Grassy", size: "Medium", releaseDate: "2018-03-09" },
      { name: "Rockwall Brawl", environment: "Desert", size: "Large", releaseDate: "2019-02-13" },
      { name: "Cavern Churn", environment: "Cave", size: "Medium", releaseDate: "2018-10-18" }
    ]
  },
  { 
    name: "Bounty", 
    color: "purple",
    icon: "⭐",
    maps: [
      { name: "Snake Prairie", environment: "Grassy", size: "Medium", releaseDate: "2017-06-15" },
      { name: "Layer Cake", environment: "Urban", size: "Medium", releaseDate: "2018-05-04" },
      { name: "Shooting Star", environment: "Space", size: "Large", releaseDate: "2017-10-16" },
      { name: "Excel", environment: "Urban", size: "Small", releaseDate: "2019-06-26" },
      { name: "Canal Grande", environment: "Urban", size: "Medium", releaseDate: "2019-11-13" }
    ]
  },
  { 
    name: "Heist", 
    color: "green",
    icon: "💰",
    maps: [
      { name: "Safe Zone", environment: "Wild West", size: "Medium", releaseDate: "2017-06-15" },
      { name: "Hot Potato", environment: "Desert", size: "Small", releaseDate: "2019-04-10" },
      { name: "G.G. Mortuary", environment: "Urban", size: "Medium", releaseDate: "2018-09-12" },
      { name: "Kaboom Canyon", environment: "Desert", size: "Medium", releaseDate: "2019-01-09" },
      { name: "Pit Stop", environment: "Urban", size: "Large", releaseDate: "2020-04-08" }
    ]
  }
];

const environmentColors: Record<string, string> = {
  "Mine": "bg-gray-700",
  "Arcade": "bg-purple-700",
  "Mushroom": "bg-green-800",
  "Stadium": "bg-yellow-700",
  "Wild West": "bg-amber-700",
  "Jungle": "bg-green-700",
  "Grassy": "bg-emerald-700",
  "Desert": "bg-orange-700",
  "Cave": "bg-stone-800",
  "Urban": "bg-sky-700",
  "Space": "bg-indigo-700"
};

export function Maps() {
  const [selectedMode, setSelectedMode] = useState("Gem Grab");
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const { maps: apiMaps, isLoadingMaps, refetchMaps } = useGameData();
  const [gameModes, setGameModes] = useState<string[]>([]);
  const { md } = useResponsive();

  // Use game data context instead of direct fetch
  useEffect(() => {
    if (apiMaps && apiMaps.length > 0) {
      // Extract unique game modes from API response
      const uniqueModes = Array.from(new Set(apiMaps.map((map: any) => map.gameMode?.name || "Unknown")));
      setGameModes(uniqueModes);
      
      // Set first mode as default if available
      if (uniqueModes.length > 0) {
        setSelectedMode(uniqueModes[0]);
      }
    } else {
      // Fallback to static data
      setGameModes(gameModesWithMaps.map(mode => mode.name));
    }
  }, [apiMaps]);

  // Extract all unique environments
  const allEnvironments = apiMaps && apiMaps.length > 0
    ? Array.from(new Set(apiMaps.map((map: any) => map.environment?.name || "Unknown")))
    : Array.from(new Set(gameModesWithMaps.flatMap(mode => mode.maps.map(map => map.environment))));

  // Get currently selected maps
  const getCurrentMaps = () => {
    if (apiMaps && apiMaps.length > 0) {
      return apiMaps.filter((map: any) => map.gameMode?.name === selectedMode);
    }

    // Fallback to static data
    const currentMode = gameModesWithMaps.find(mode => mode.name === selectedMode) || gameModesWithMaps[0];
    return currentMode.maps;
  };
  
  // Filter maps based on search and environment filter
  const filteredMaps = getCurrentMaps().filter((map: any) => {
    const mapName = apiMaps && apiMaps.length > 0 ? map.name : map.name;
    const mapEnvironment = apiMaps && apiMaps.length > 0 ? (map.environment?.name || "Unknown") : map.environment;
    
    const matchesSearch = mapName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnvironment = environmentFilter === "all" || mapEnvironment === environmentFilter;
    
    return matchesSearch && matchesEnvironment;
  });

  const getModeBadgeColor = (mode: string) => {
    if (!apiMaps || apiMaps.length === 0) {
      const modeData = gameModesWithMaps.find(m => m.name === mode);
      return modeData?.color || "blue";
    }
    
    // Simple colors based on mode name
    const modeColors: Record<string, string> = {
      "Gem Grab": "blue",
      "Brawl Ball": "yellow",
      "Showdown": "red",
      "Bounty": "purple",
      "Heist": "green",
      "Hot Zone": "red",
      "Knockout": "purple",
      "Duels": "yellow",
      "Payload": "green"
    };
    
    return modeColors[mode] || "blue";
  };

  const handleRefresh = async () => {
    await refetchMaps();
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Brawl Stars Maps
        </h1>
        <p className="text-muted-foreground">
          Erkunde und lerne die verschiedenen Maps in Brawl Stars kennen.
        </p>
      </div>
      
      {isLoadingMaps ? (
        <Card className="bg-card border border-border shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-brawl-purple mb-4" />
            <p className="text-muted-foreground">Lade Maps von der API...</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border border-border shadow-md">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-brawl-blue" /> Spielmodi
                </CardTitle>
                <CardDescription>Wähle einen Spielmodus, um seine Maps anzuzeigen</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="hidden md:flex"
              >
                Aktualisieren
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {gameModes.map(mode => (
                <Button
                  key={mode}
                  variant={selectedMode === mode ? "default" : "outline"}
                  className={selectedMode === mode ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""}
                  onClick={() => {
                    setSelectedMode(mode);
                    setEnvironmentFilter("all");
                  }}
                >
                  {mode}
                </Button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Maps durchsuchen..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-64">
                  <Select
                    value={environmentFilter}
                    onValueChange={setEnvironmentFilter}
                  >
                    <SelectTrigger className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Nach Umgebung filtern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Umgebungen</SelectItem>
                      {allEnvironments.map((env: string) => (
                        <SelectItem key={env} value={env}>{env}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <BrawlCard className="overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <GradientText className="text-lg font-bold">{selectedMode} Maps</GradientText>
                  </div>
                  <BrawlBadge variant={getModeBadgeColor(selectedMode) as "blue" | "purple" | "yellow" | "red"}>
                    {filteredMaps.length} maps
                  </BrawlBadge>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Map Name</TableHead>
                        <TableHead>Umgebung</TableHead>
                        {apiMaps && apiMaps.length > 0 && <TableHead>Status</TableHead>}
                        {(!apiMaps || apiMaps.length === 0) && <TableHead>Größe</TableHead>}
                        <TableHead>Veröffentlichung</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaps.length > 0 ? (
                        filteredMaps.map((map: any, idx: number) => (
                          <TableRow key={apiMaps && apiMaps.length > 0 ? map.id : map.name} className="hover:bg-muted/50">
                            <TableCell className="font-medium">
                              {apiMaps && apiMaps.length > 0 ? map.name : map.name}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                apiMaps && apiMaps.length > 0
                                  ? (environmentColors[map.environment?.name] || 'bg-gray-600')
                                  : (environmentColors[map.environment] || 'bg-gray-600')
                              }>
                                {apiMaps && apiMaps.length > 0 ? (map.environment?.name || "Unknown") : map.environment}
                              </Badge>
                            </TableCell>
                            {apiMaps && apiMaps.length > 0 && (
                              <TableCell>
                                <Badge className={map.disabled ? 'bg-red-600' : 'bg-green-600'}>
                                  {map.disabled ? "Deaktiviert" : "Aktiv"}
                                </Badge>
                              </TableCell>
                            )}
                            {(!apiMaps || apiMaps.length === 0) && (
                              <TableCell>{map.size}</TableCell>
                            )}
                            <TableCell>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {apiMaps && apiMaps.length > 0 ? 
                                  (map.dateAdded ? new Date(map.dateAdded).toLocaleDateString() : "Unbekannt") : 
                                  map.releaseDate}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            <Info className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Keine Maps gefunden, die deinen Kriterien entsprechen.</p>
                            <p className="text-sm">Versuche, deine Suche oder Filter anzupassen.</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredMaps.length > 0 && (
                  <div className="p-4 bg-muted/20 border-t border-border text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>
                      {apiMaps && apiMaps.length > 0 
                        ? "Map-Daten basierend auf der Brawl Stars API"
                        : "Map-Daten basierend auf Informationen aus Brawl Stars Ressourcen."}
                    </span>
                  </div>
                )}
              </BrawlCard>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Maps;
