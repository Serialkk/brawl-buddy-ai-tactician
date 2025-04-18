import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Info, Award, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrawlCard, BrawlBadge, GradientText } from "@/components/ui/brawl-classes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGameData } from "@/contexts/GameDataContext";
import { useResponsive } from "@/hooks/useResponsive";
import { MapDetailsModal } from "./maps/MapDetailsModal";

// Map environment colors
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
  const [selectedMode, setSelectedMode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const { events, isLoadingMaps, refetchMaps } = useGameData();
  const { md } = useResponsive();
  
  const [selectedMap, setSelectedMap] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique game modes from active events
  const gameModes = Array.from(new Set(events.map((event: any) => event.map.gameMode.name)));
  
  // Set initial selected mode
  useEffect(() => {
    if (gameModes.length > 0 && !selectedMode) {
      setSelectedMode(gameModes[0]);
    }
  }, [gameModes]);

  // Get currently active maps for the selected mode
  const getCurrentMaps = () => {
    return events.filter((event: any) => event.map.gameMode.name === selectedMode).map((event: any) => ({
      name: event.map.name,
      environment: event.map.environment?.name || "Unknown",
      gameMode: event.map.gameMode.name,
      disabled: false,
      dateAdded: event.startTime
    }));
  };
  
  // Filter maps based on search and environment filter
  const filteredMaps = getCurrentMaps().filter((map: any) => {
    const matchesSearch = map.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnvironment = environmentFilter === "all" || map.environment === environmentFilter;
    return matchesSearch && matchesEnvironment;
  });

  // Get all unique environments from active maps
  const allEnvironments = Array.from(new Set(
    events.map((event: any) => event.map.environment?.name || "Unknown")
  ));

  const getModeBadgeColor = (mode: string) => {
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
          Aktive Brawl Stars Maps
        </h1>
        <p className="text-muted-foreground">
          Erkunde die aktuell aktiven Maps in Brawl Stars
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
                  Aktive Spielmodi
                </CardTitle>
                <CardDescription>Wähle einen Spielmodus, um seine aktiven Maps anzuzeigen</CardDescription>
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
                    <GradientText className="text-lg font-bold">Aktive {selectedMode} Maps</GradientText>
                  </div>
                  <BrawlBadge variant={getModeBadgeColor(selectedMode) as "blue" | "purple" | "yellow" | "red"}>
                    {filteredMaps.length} aktive maps
                  </BrawlBadge>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Map Name</TableHead>
                        <TableHead>Umgebung</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aktiv seit</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {filteredMaps.length > 0 ? (
                        filteredMaps.map((map: any, idx: number) => (
                          <TableRow 
                            key={`${map.name}-${idx}`}
                            className="hover:bg-muted/50 cursor-pointer"
                            onClick={() => {
                              setSelectedMap(map);
                              setIsModalOpen(true);
                            }}
                          >
                            <TableCell className="font-medium">
                              {map.name}
                            </TableCell>
                            <TableCell>
                              <Badge className={environmentColors[map.environment] || 'bg-gray-600'}>
                                {map.environment}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-600">
                                Aktiv
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(map.dateAdded).toLocaleDateString('de-DE')}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            <Info className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Keine aktiven Maps für diesen Modus gefunden.</p>
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
                    <span>Map-Daten basierend auf aktuellen Events aus der Brawl Stars API</span>
                  </div>
                )}
              </BrawlCard>
            </div>
          </CardContent>
        </Card>
      )}
      
      {selectedMap && (
        <MapDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          map={selectedMap}
        />
      )}
    </div>
  );
}

export default Maps;
