
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { allBrawlers } from "@/data/brawlers";

export const PersonalStats = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["userStats", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brawl-purple" />
      </div>
    );
  }

  // Calculate total games, victories, and defeats
  const totalGames = stats?.reduce((sum, stat) => sum + (stat.games_played || 0), 0) || 0;
  const totalVictories = stats?.reduce((sum, stat) => sum + (stat.victories || 0), 0) || 0;
  const totalDefeats = stats?.reduce((sum, stat) => sum + (stat.defeats || 0), 0) || 0;
  const totalDraws = stats?.reduce((sum, stat) => sum + (stat.draws || 0), 0) || 0;
  
  // Win rate calculation
  const winRate = totalGames > 0 ? ((totalVictories / totalGames) * 100).toFixed(1) : "0";
  
  // Find favorite brawlers (most played)
  const favoriteBrawlers = [...(stats || [])]
    .sort((a, b) => (b.games_played || 0) - (a.games_played || 0))
    .slice(0, 5)
    .map(stat => {
      const brawler = allBrawlers.find(b => b.id === stat.brawler_id);
      return {
        ...stat,
        brawlerName: brawler?.name || `Brawler #${stat.brawler_id}`,
        winRate: stat.games_played ? ((stat.victories || 0) / stat.games_played) * 100 : 0
      };
    });

  // Prepare chart data
  const chartData = favoriteBrawlers.map(stat => ({
    name: stat.brawlerName,
    victories: stat.victories || 0,
    defeats: stat.defeats || 0,
    draws: stat.draws || 0,
    winRate: parseFloat(((stat.victories || 0) / (stat.games_played || 1) * 100).toFixed(1))
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGames}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Win Rate
            </CardTitle>
            {parseFloat(winRate) > 50 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Victories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{totalVictories}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Defeats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{totalDefeats}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Brawlers Performance</CardTitle>
          <CardDescription>Your most played brawlers and their stats</CardDescription>
        </CardHeader>
        <CardContent>
          {favoriteBrawlers.length > 0 ? (
            <div className="h-80">
              <ChartContainer 
                config={{
                  victories: { color: "#22c55e" },
                  defeats: { color: "#ef4444" },
                  draws: { color: "#64748b" },
                  winRate: { color: "#8b5cf6" }
                }}
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="victories" name="Victories" fill="#22c55e" />
                  <Bar yAxisId="left" dataKey="defeats" name="Defeats" fill="#ef4444" />
                  <Bar yAxisId="left" dataKey="draws" name="Draws" fill="#64748b" />
                  <Bar yAxisId="right" dataKey="winRate" name="Win Rate %" fill="#8b5cf6" />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No brawler data available. Start playing to see your stats!
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brawler Details</CardTitle>
          <CardDescription>Detailed statistics for your brawlers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brawler</TableHead>
                <TableHead>Games</TableHead>
                <TableHead>Victories</TableHead>
                <TableHead>Defeats</TableHead>
                <TableHead>Win Rate</TableHead>
                <TableHead>Favorite Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats && stats.length > 0 ? (
                stats.map((stat) => {
                  const brawler = allBrawlers.find(b => b.id === stat.brawler_id);
                  const statWinRate = stat.games_played ? 
                    ((stat.victories || 0) / stat.games_played * 100).toFixed(1) : 
                    "0";
                  
                  return (
                    <TableRow key={stat.id}>
                      <TableCell className="font-medium">
                        {brawler?.name || `Brawler #${stat.brawler_id}`}
                      </TableCell>
                      <TableCell>{stat.games_played || 0}</TableCell>
                      <TableCell>{stat.victories || 0}</TableCell>
                      <TableCell>{stat.defeats || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {parseFloat(statWinRate) > 50 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          {statWinRate}%
                        </div>
                      </TableCell>
                      <TableCell>{stat.favorite_game_mode || "N/A"}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No data available. Start playing to see your stats!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
