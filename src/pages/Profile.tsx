
import React from 'react';
import { PlayerProfile } from '@/components/profiles/PlayerProfile';
import { PersonalStats } from '@/components/performance-tracking/PersonalStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Trophy, BarChart3, Medal } from 'lucide-react';

const Profile = () => {
  return (
    <div className="container mx-auto py-6 px-4 relative z-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
        Player Profile
      </h1>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 max-w-md">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Matches</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Medal className="h-4 w-4" />
            <span className="hidden sm:inline">Achievements</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <PlayerProfile />
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-6">
          <PersonalStats />
        </TabsContent>
        
        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Detailed match history coming soon. Check the overview tab for recent matches.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-brawl-yellow" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-4 border border-dashed rounded-lg flex items-center gap-3">
                    <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
                      <Medal className={i < 2 ? "h-5 w-5 text-brawl-yellow" : "h-5 w-5 text-muted-foreground"} />
                    </div>
                    <div>
                      <h3 className="font-medium">{i < 2 ? `Achievement #${i + 1}` : "Locked Achievement"}</h3>
                      <p className="text-xs text-muted-foreground">{i < 2 ? "Completed" : "Keep playing to unlock"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
