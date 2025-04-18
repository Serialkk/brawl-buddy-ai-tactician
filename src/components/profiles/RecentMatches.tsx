
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { brawlers } from '@/data/brawlers';
import { Progress } from '@/components/ui/progress';

export const RecentMatches = () => {
  const { user } = useAuth();

  const { data: recentReplays, isLoading } = useQuery({
    queryKey: ['userReplays', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('game_replays')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Recent Matches</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentReplays && recentReplays.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Brawler</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Map</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReplays.map((replay) => {
                const brawler = brawlers.find(b => b.id === replay.brawler_used);
                const resultColor = replay.result === 'Victory' ? 'text-green-500' : 
                                    replay.result === 'Defeat' ? 'text-red-500' : 'text-yellow-500';
                
                return (
                  <TableRow key={replay.id}>
                    <TableCell className="font-medium">{formatDate(replay.created_at)}</TableCell>
                    <TableCell>{replay.game_mode}</TableCell>
                    <TableCell>{brawler?.name || `Brawler #${replay.brawler_used}`}</TableCell>
                    <TableCell className={resultColor}>{replay.result}</TableCell>
                    <TableCell>{replay.map_name || 'Unknown Map'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No recent matches found. Start playing to record your history!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
