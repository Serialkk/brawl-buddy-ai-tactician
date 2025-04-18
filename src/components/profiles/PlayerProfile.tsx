
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerStats } from './PlayerStats';
import { RecentMatches } from './RecentMatches';
import { BrawlerStats } from './BrawlerStats';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { EditIcon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const PlayerProfile = () => {
  const { user } = useAuth();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  const userEmail = user?.email || '';
  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?';
  const userName = user?.user_metadata?.username || userEmail || 'User';
  const userCreatedAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown';

  if (isLoadingStats) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Calculate totals
  const totalVictories = stats?.reduce((sum, stat) => sum + (stat.victories || 0), 0) || 0;
  const totalDefeats = stats?.reduce((sum, stat) => sum + (stat.defeats || 0), 0) || 0;
  const totalDraws = stats?.reduce((sum, stat) => sum + (stat.draws || 0), 0) || 0;
  const totalGames = totalVictories + totalDefeats + totalDraws;

  const handleEditProfile = () => {
    toast.info("Profile editing will be available in a future update!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-brawl-blue/20 shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-brawl-blue">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-xl bg-brawl-blue/20">{userInitial}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  <Badge className="bg-brawl-purple hover:bg-brawl-purple/90">Level 7</Badge>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{userName}</CardTitle>
                  {totalGames > 100 && (
                    <Badge className="bg-brawl-yellow hover:bg-brawl-yellow/90 flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Pro Player
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
                <p className="text-xs text-muted-foreground mt-1">Member since {userCreatedAt}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEditProfile}
              className="flex items-center gap-1"
            >
              <EditIcon className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-4">
            <PlayerStats
              victories={totalVictories}
              defeats={totalDefeats}
              draws={totalDraws}
            />
          </div>
        </CardContent>
      </Card>
      
      <BrawlerStats stats={stats || []} />
      <RecentMatches />
    </div>
  );
};
