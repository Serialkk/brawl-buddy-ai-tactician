
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Search, Filter, Info, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrawlCard, BrawlBadge, GradientText } from "@/components/ui/brawl-classes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  // Extract all unique environments
  const allEnvironments = Array.from(
    new Set(gameModesWithMaps.flatMap(mode => mode.maps.map(map => map.environment)))
  );

  // Get the currently selected game mode
  const currentMode = gameModesWithMaps.find(mode => mode.name === selectedMode) || gameModesWithMaps[0];
  
  // Filter maps based on search and environment filter
  const filteredMaps = currentMode.maps.filter(map => {
    const matchesSearch = map.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnvironment = environmentFilter === "all" || map.environment === environmentFilter;
    return matchesSearch && matchesEnvironment;
  });

  const getModeBadgeColor = (mode: string) => {
    const modeData = gameModesWithMaps.find(m => m.name === mode);
    return modeData?.color || "blue";
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Brawl Stars Maps
        </h1>
        <p className="text-muted-foreground">
          Explore and learn about the various maps in Brawl Stars.
        </p>
      </div>
      
      <Card className="bg-card border border-border shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-brawl-blue" /> Game Modes
          </CardTitle>
          <CardDescription>Select a game mode to view its maps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {gameModesWithMaps.map(mode => (
              <Button
                key={mode.name}
                variant={selectedMode === mode.name ? "default" : "outline"}
                className={selectedMode === mode.name ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""}
                onClick={() => {
                  setSelectedMode(mode.name);
                  setEnvironmentFilter("all");
                }}
              >
                <span className="mr-2">{mode.icon}</span> {mode.name}
              </Button>
            ))}
          </div>
          
          {currentMode && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search maps..."
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
                      <SelectValue placeholder="Filter by Environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Environments</SelectItem>
                      {allEnvironments.map(env => (
                        <SelectItem key={env} value={env}>{env}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <BrawlCard className="overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{currentMode.icon}</span>
                    <GradientText className="text-lg font-bold">{currentMode.name} Maps</GradientText>
                  </div>
                  <BrawlBadge variant={getModeBadgeColor(currentMode.name) as "blue" | "purple" | "yellow" | "red"}>
                    {filteredMaps.length} maps
                  </BrawlBadge>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Map Name</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Release Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaps.length > 0 ? (
                        filteredMaps.map((map, idx) => (
                          <TableRow key={map.name} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{map.name}</TableCell>
                            <TableCell>
                              <Badge className={`${environmentColors[map.environment] || 'bg-gray-600'}`}>
                                {map.environment}
                              </Badge>
                            </TableCell>
                            <TableCell>{map.size}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {map.releaseDate}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            <Info className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>No maps found matching your criteria.</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
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
                      Map data based on information from Brawl Stars resources.
                    </span>
                  </div>
                )}
              </BrawlCard>
              
              <Card className="bg-card border border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-brawl-yellow" /> Best Brawlers for {currentMode.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Recommended brawlers for this game mode:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentMode.name === "Gem Grab" && (
                      <>
                        <Badge className="bg-green-600">Poco</Badge>
                        <Badge className="bg-blue-600">Gene</Badge>
                        <Badge className="bg-purple-600">Tara</Badge>
                        <Badge className="bg-yellow-600">Pam</Badge>
                        <Badge className="bg-red-600">Rosa</Badge>
                      </>
                    )}
                    {currentMode.name === "Brawl Ball" && (
                      <>
                        <Badge className="bg-green-600">El Primo</Badge>
                        <Badge className="bg-blue-600">Bibi</Badge>
                        <Badge className="bg-purple-600">Frank</Badge>
                        <Badge className="bg-yellow-600">Mortis</Badge>
                        <Badge className="bg-red-600">Shelly</Badge>
                      </>
                    )}
                    {currentMode.name === "Showdown" && (
                      <>
                        <Badge className="bg-green-600">Leon</Badge>
                        <Badge className="bg-blue-600">Bo</Badge>
                        <Badge className="bg-purple-600">Brock</Badge>
                        <Badge className="bg-yellow-600">Bull</Badge>
                        <Badge className="bg-red-600">Crow</Badge>
                      </>
                    )}
                    {currentMode.name === "Bounty" && (
                      <>
                        <Badge className="bg-green-600">Piper</Badge>
                        <Badge className="bg-blue-600">Brock</Badge>
                        <Badge className="bg-purple-600">Tick</Badge>
                        <Badge className="bg-yellow-600">Bo</Badge>
                        <Badge className="bg-red-600">Bea</Badge>
                      </>
                    )}
                    {currentMode.name === "Heist" && (
                      <>
                        <Badge className="bg-green-600">Colt</Badge>
                        <Badge className="bg-blue-600">Bull</Badge>
                        <Badge className="bg-purple-600">Dynamike</Badge>
                        <Badge className="bg-yellow-600">Barley</Badge>
                        <Badge className="bg-red-600">Darryl</Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
