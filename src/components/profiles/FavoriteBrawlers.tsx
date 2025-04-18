
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { brawlers } from "@/data/brawlers";
import { UserStat } from "@/types/userStats";

interface FavoriteBrawlersProps {
  stats: UserStat[];
}

export const FavoriteBrawlers = ({ stats }: FavoriteBrawlersProps) => {
  // Sort by games played to find favorites
  const favoriteBrawlers = [...stats]
    .sort((a, b) => (b.games_played || 0) - (a.games_played || 0))
    .slice(0, 5)
    .map(stat => {
      const brawler = brawlers.find(b => b.id === stat.brawler_id);
      const winRate = stat.games_played ? 
        ((stat.victories || 0) / stat.games_played * 100).toFixed(1) : "0";
      
      return {
        ...stat,
        brawlerName: brawler?.name || `Brawler #${stat.brawler_id}`,
        brawlerImage: brawler?.image || "/placeholder.svg",
        winRate
      };
    });

  if (favoriteBrawlers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Brawlers</CardTitle>
          <CardDescription>Your most played characters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No brawler data available yet. Start playing to see your stats!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Brawlers</CardTitle>
        <CardDescription>Your most played characters</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brawler</TableHead>
              <TableHead>Games</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead className="text-right">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favoriteBrawlers.map((brawler) => (
              <TableRow key={brawler.brawler_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={brawler.brawlerImage} alt={brawler.brawlerName} />
                      <AvatarFallback>{brawler.brawlerName[0]}</AvatarFallback>
                    </Avatar>
                    <span>{brawler.brawlerName}</span>
                  </div>
                </TableCell>
                <TableCell>{brawler.games_played}</TableCell>
                <TableCell>{brawler.winRate}%</TableCell>
                <TableCell className="text-right">
                  <div className="w-40 ml-auto">
                    <Progress 
                      value={parseFloat(brawler.winRate)} 
                      className={`h-2 ${
                        parseFloat(brawler.winRate) > 60 ? 'bg-green-100' : 
                        parseFloat(brawler.winRate) < 40 ? 'bg-red-100' : 'bg-yellow-100'
                      }`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
