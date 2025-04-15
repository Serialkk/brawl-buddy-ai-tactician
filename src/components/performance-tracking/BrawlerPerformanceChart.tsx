
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { brawlers } from "@/data/brawlers";
import { UserStat } from "@/types/userStats";

interface BrawlerPerformanceChartProps {
  stats: UserStat[];
}

export const BrawlerPerformanceChart = ({ stats }: BrawlerPerformanceChartProps) => {
  // Find favorite brawlers (most played)
  const favoriteBrawlers = [...stats]
    .sort((a, b) => (b.games_played || 0) - (a.games_played || 0))
    .slice(0, 5)
    .map(stat => {
      const brawler = brawlers.find(b => b.id === stat.brawler_id);
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
              <ResponsiveContainer>
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
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No brawler data available. Start playing to see your stats!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
