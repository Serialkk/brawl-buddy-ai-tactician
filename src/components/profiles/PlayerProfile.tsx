
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerStats } from './PlayerStats';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export const PlayerProfile = () => {
  const { user } = useAuth();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const userEmail = user?.email || '';
  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?';
  const userName = user?.user_metadata?.username || userEmail || 'User';

  if (isLoadingStats) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userName}</CardTitle>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-4">
            <PlayerStats
              victories={stats?.victories || 0}
              defeats={stats?.defeats || 0}
              draws={stats?.draws || 0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
