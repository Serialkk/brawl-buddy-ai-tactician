
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Medal, 
  Trophy, 
  Star, 
  BarChart3, 
  Users,
  Timer,
  Crown
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from "recharts";
import { fetchBrawlers } from "@/services/brawlStarsService";

// Types for our statistics
interface BrawlerStats {
  id: number;
  name: string;
  pickRate: number;
  winRate: number;
  trend: "up" | "down" | "stable";
  rank: number;
  previousRank: number;
}

interface PlayerStats {
  name: string;
  score: number;
  brawlers: number;
  winRate: number;
}

// Demo data for now - would be replaced with real API data
const brawlerStatsData: BrawlerStats[] = [
  { id: 16000000, name: "Shelly", pickRate: 12.5, winRate: 53.2, trend: "up", rank: 1, previousRank: 3 },
  { id: 16000001, name: "Colt", pickRate: 8.7, winRate: 49.1, trend: "down", rank: 2, previousRank: 1 },
  { id: 16000002, name: "Bull", pickRate: 7.3, winRate: 50.5, trend: "stable", rank: 3, previousRank: 3 },
  { id: 16000003, name: "Brock", pickRate: 6.9, winRate: 48.7, trend: "down", rank: 4, previousRank: 2 },
  { id: 16000004, name: "Jessie", pickRate: 9.2, winRate: 52.8, trend: "up", rank: 5, previousRank: 7 },
  { id: 16000005, name: "Nita", pickRate: 8.1, winRate: 50.2, trend: "stable", rank: 6, previousRank: 6 },
  { id: 16000006, name: "Dynamike", pickRate: 5.4, winRate: 47.5, trend: "down", rank: 7, previousRank: 5 },
  { id: 16000007, name: "El Primo", pickRate: 10.1, winRate: 51.3, trend: "up", rank: 8, previousRank: 10 },
  { id: 16000008, name: "Barley", pickRate: 6.2, winRate: 48.9, trend: "down", rank: 9, previousRank: 8 },
  { id: 16000009, name: "Poco", pickRate: 7.8, winRate: 52.1, trend: "up", rank: 10, previousRank: 12 },
];

const topPlayersData: PlayerStats[] = [
  { name: "BrawlMaster", score: 35000, brawlers: 62, winRate: 68.3 },
  { name: "StarPower99", score: 32500, brawlers: 58, winRate: 65.7 },
  { name: "LegendaryBrawl", score: 31750, brawlers: 60, winRate: 64.2 },
  { name: "ProGamer007", score: 30800, brawlers: 55, winRate: 63.8 },
  { name: "BrawlKing", score: 29500, brawlers: 59, winRate: 62.5 },
];

const winRateHistoryData = [
  { month: 'Jan', gemGrab: 52, brawlBall: 48, heist: 45, bounty: 51, siege: 47 },
  { month: 'Feb', gemGrab: 53, brawlBall: 50, heist: 46, bounty: 52, siege: 48 },
  { month: 'Mar', gemGrab: 54, brawlBall: 53, heist: 48, bounty: 50, siege: 46 },
  { month: 'Apr', gemGrab: 52, brawlBall: 54, heist: 50, bounty: 49, siege: 47 },
  { month: 'May', gemGrab: 53, brawlBall: 55, heist: 51, bounty: 47, siege: 48 },
  { month: 'Jun', gemGrab: 55, brawlBall: 53, heist: 52, bounty: 48, siege: 49 },
];

const pickRateData = [
  { name: "Shelly", rate: 12.5 },
  { name: "Colt", rate: 8.7 },
  { name: "Bull", rate: 7.3 },
  { name: "Brock", rate: 6.9 },
  { name: "Jessie", rate: 9.2 },
  { name: "Nita", rate: 8.1 },
  { name: "Dynamike", rate: 5.4 },
  { name: "El Primo", rate: 10.1 },
  { name: "Barley", rate: 6.2 },
  { name: "Poco", rate: 7.8 },
];

export function RealTimeStats() {
  const [activeTab, setActiveTab] = useState("brawlers");
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // seconds
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Use React Query to fetch brawlers data
  const { data: brawlers, isLoading } = useQuery({
    queryKey: ['brawlers'],
    queryFn: fetchBrawlers,
  });

  // Effect to simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, you would make an API call here
      setLastUpdated(new Date());
      console.log("Updating real-time stats...");
    }, refreshInterval * 1000);

    return () => clearInterval(timer);
  }, [refreshInterval]);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Real-Time Statistics
        </h1>
        <p className="text-muted-foreground mb-2">
          Live meta stats, player rankings, and performance trends
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Badge variant="outline" className="ml-2">Auto-refreshes every {refreshInterval}s</Badge>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="brawlers" className="flex gap-2 items-center">
            <Trophy className="h-4 w-4" /> Brawler Rankings
          </TabsTrigger>
          <TabsTrigger value="players" className="flex gap-2 items-center">
            <Users className="h-4 w-4" /> Top Players
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex gap-2 items-center">
            <BarChart3 className="h-4 w-4" /> Meta Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="brawlers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-brawl-yellow" /> Top Brawlers by Win Rate
                </CardTitle>
                <CardDescription>
                  Current meta performance across all game modes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>Brawler</TableHead>
                      <TableHead className="text-right">Pick Rate</TableHead>
                      <TableHead className="text-right">Win Rate</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brawlerStatsData.map((brawler) => (
                      <TableRow key={brawler.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1">
                            {brawler.rank}
                            {brawler.previousRank > brawler.rank ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : brawler.previousRank < brawler.rank ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <span className="text-xs mx-1">—</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-sm font-bold">{brawler.name.charAt(0)}</span>
                            </div>
                            {brawler.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{brawler.pickRate}%</TableCell>
                        <TableCell className="text-right">
                          <Badge className={brawler.winRate > 50 ? "bg-green-500" : "bg-amber-500"}>
                            {brawler.winRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {brawler.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500 inline" />}
                          {brawler.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500 inline" />}
                          {brawler.trend === "stable" && <span className="text-xs">Stable</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-brawl-purple" /> Pick Rates
                </CardTitle>
                <CardDescription>
                  Most popular brawlers this week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={{
                  rate: { label: "Pick Rate" },
                  gemGrab: { theme: { light: "#4562E5", dark: "#4562E5" } },
                  brawlBall: { theme: { light: "#EC8B32", dark: "#EC8B32" } },
                  heist: { theme: { light: "#3BBEB4", dark: "#3BBEB4" } },
                  bounty: { theme: { light: "#EF3E72", dark: "#EF3E72" } },
                  siege: { theme: { light: "#8C68E2", dark: "#8C68E2" } },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pickRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="rate" stroke="#8C68E2" fill="#8C68E255" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-brawl-yellow" /> Top Global Players
              </CardTitle>
              <CardDescription>
                Players with the highest trophy counts and win rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">Trophy Score</TableHead>
                    <TableHead className="text-right">Brawlers</TableHead>
                    <TableHead className="text-right">Win Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPlayersData.map((player, idx) => (
                    <TableRow key={player.name}>
                      <TableCell className="font-medium">
                        {idx === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {idx === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                        {idx === 2 && <Medal className="h-4 w-4 text-amber-800" />}
                        {idx > 2 && idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{player.name}</div>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{player.score.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{player.brawlers}/{brawlers?.length || '??'}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-brawl-blue">{player.winRate}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-brawl-blue" /> Win Rate Trends by Game Mode
              </CardTitle>
              <CardDescription>
                Six-month performance across all major game modes
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer config={{
                gemGrab: { label: "Gem Grab", theme: { light: "#4562E5", dark: "#4562E5" } },
                brawlBall: { label: "Brawl Ball", theme: { light: "#EC8B32", dark: "#EC8B32" } },
                heist: { label: "Heist", theme: { light: "#3BBEB4", dark: "#3BBEB4" } },
                bounty: { label: "Bounty", theme: { light: "#EF3E72", dark: "#EF3E72" } },
                siege: { label: "Siege", theme: { light: "#8C68E2", dark: "#8C68E2" } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={winRateHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[40, 60]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="gemGrab" stroke="#4562E5" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="brawlBall" stroke="#EC8B32" />
                    <Line type="monotone" dataKey="heist" stroke="#3BBEB4" />
                    <Line type="monotone" dataKey="bounty" stroke="#EF3E72" />
                    <Line type="monotone" dataKey="siege" stroke="#8C68E2" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
