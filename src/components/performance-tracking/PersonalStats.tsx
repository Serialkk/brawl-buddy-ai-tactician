import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, BarChart3, ListFilter, TrendingUp } from "lucide-react";
import { StatCards } from "./StatCards";
import { BrawlerPerformanceChart } from "./BrawlerPerformanceChart";
import { BrawlerDetailsTable } from "./BrawlerDetailsTable";
import { AdvancedMetrics } from "./AdvancedMetrics";
import { TimeBasedStats } from "./TimeBasedStats";
import { UserStat } from "@/types/userStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PersonalStats = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<string>("all");

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

  // Calculate totals only once
  const totalGames = stats?.reduce((sum, stat) => sum + (stat.games_played || 0), 0) || 0;
  const totalVictories = stats?.reduce((sum, stat) => sum + (stat.victories || 0), 0) || 0;
  const totalDefeats = stats?.reduce((sum, stat) => sum + (stat.defeats || 0), 0) || 0;
  const totalDraws = stats?.reduce((sum, stat) => sum + (stat.draws || 0), 0) || 0;
  
  // Win rate calculation
  const winRate = totalGames > 0 ? ((totalVictories / totalGames) * 100).toFixed(1) : "0";

  // Mock data for new components - in a real app, this would come from the API
  const mockAdvancedMetrics = {
    accuracy: 75,
    positioning: 82,
    superUsage: 68,
    mapControl: 70,
    teamwork: 85,
    objectiveControl: 78,
  };

  const mockTimeData = Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    winRate: 50 + Math.random() * 30,
    accuracy: 60 + Math.random() * 20,
  })).reverse();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brawl-purple" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Performance Statistics</h1>
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <StatCards 
        totalGames={totalGames}
        totalVictories={totalVictories}
        totalDefeats={totalDefeats}
        winRate={winRate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdvancedMetrics metrics={mockAdvancedMetrics} />
        <TimeBasedStats data={mockTimeData} />
      </div>
      
      <Tabs defaultValue="charts" className="space-y-5">
        <TabsList className="grid grid-cols-3 w-[600px]">
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Performance Charts
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Trends Analysis
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Detailed Statistics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle>Brawler Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <BrawlerPerformanceChart stats={stats || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                More detailed trend analysis coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <BrawlerDetailsTable stats={stats || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
