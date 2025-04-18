
import React from "react";
import { PersonalStats } from "@/components/performance-tracking/PersonalStats";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Award, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RealTimeStats() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["userStats", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Berechne die allgemeinen Statistiken
  const generalStats = React.useMemo(() => {
    if (!stats?.length) return null;

    // Finde den erfolgreichsten Brawler
    const mostSuccessful = stats.reduce((prev, current) => {
      const prevWinRate = prev.victories / (prev.games_played || 1);
      const currentWinRate = current.victories / (current.games_played || 1);
      return currentWinRate > prevWinRate ? current : prev;
    });

    // Finde den meistgespielten Brawler
    const mostPlayed = stats.reduce((prev, current) => {
      return (current.games_played || 0) > (prev.games_played || 0) ? current : prev;
    });

    // Gesamtsiege
    const totalVictories = stats.reduce((sum, stat) => sum + (stat.victories || 0), 0);

    return {
      mostSuccessful,
      mostPlayed,
      totalVictories
    };
  }, [stats]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Performance Statistiken</h2>
      </div>
      <div className="border-b pb-5">
        <p className="text-muted-foreground">
          Verfolge deinen Fortschritt, analysiere deine Performance und verbessere dein Spiel.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : generalStats ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Erfolgreichster Brawler
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Brawler #{generalStats.mostSuccessful.brawler_id}</div>
              <p className="text-xs text-muted-foreground">
                {((generalStats.mostSuccessful.victories / (generalStats.mostSuccessful.games_played || 1)) * 100).toFixed(1)}% Siegesrate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Meistgespielter Brawler
              </CardTitle>
              <Star className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Brawler #{generalStats.mostPlayed.brawler_id}</div>
              <p className="text-xs text-muted-foreground">
                {generalStats.mostPlayed.games_played} Spiele
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gesamtsiege
              </CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generalStats.totalVictories}</div>
              <p className="text-xs text-muted-foreground">
                Über alle Brawler
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Keine Statistiken verfügbar</p>
      )}
      
      <PersonalStats />
    </div>
  );
}

export default RealTimeStats;
