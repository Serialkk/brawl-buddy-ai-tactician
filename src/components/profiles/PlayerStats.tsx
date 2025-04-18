
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Medal } from 'lucide-react';

interface PlayerStatsProps {
  victories?: number;
  defeats?: number;
  draws?: number;
  winRate?: number;
}

export const PlayerStats = ({ victories = 0, defeats = 0, draws = 0 }: PlayerStatsProps) => {
  const totalGames = victories + defeats + draws;
  const winRate = totalGames > 0 ? ((victories / totalGames) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Siege-Rate</CardTitle>
          <Trophy className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{winRate}%</div>
          <p className="text-xs text-muted-foreground">
            {victories} Siege von {totalGames} Spielen
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Niederlagen</CardTitle>
          <Target className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{defeats}</div>
          <p className="text-xs text-muted-foreground">
            {((defeats / totalGames) * 100 || 0).toFixed(1)}% aller Spiele
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unentschieden</CardTitle>
          <Medal className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draws}</div>
          <p className="text-xs text-muted-foreground">
            {((draws / totalGames) * 100 || 0).toFixed(1)}% aller Spiele
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
