
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { StatCards } from "./StatCards";
import { BrawlerPerformanceChart } from "./BrawlerPerformanceChart";
import { BrawlerDetailsTable } from "./BrawlerDetailsTable";
import { UserStat } from "@/types/userStats";

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

  // Calculate totals only once
  const totalGames = stats?.reduce((sum, stat) => sum + (stat.games_played || 0), 0) || 0;
  const totalVictories = stats?.reduce((sum, stat) => sum + (stat.victories || 0), 0) || 0;
  const totalDefeats = stats?.reduce((sum, stat) => sum + (stat.defeats || 0), 0) || 0;
  const totalDraws = stats?.reduce((sum, stat) => sum + (stat.draws || 0), 0) || 0;
  
  // Win rate calculation
  const winRate = totalGames > 0 ? ((totalVictories / totalGames) * 100).toFixed(1) : "0";
  
  return (
    <div className="space-y-6">
      <StatCards 
        totalGames={totalGames}
        totalVictories={totalVictories}
        totalDefeats={totalDefeats}
        winRate={winRate}
      />
      
      <BrawlerPerformanceChart stats={stats || []} />
      
      <BrawlerDetailsTable stats={stats || []} />
    </div>
  );
};
