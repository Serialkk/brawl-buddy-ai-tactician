
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";
import { brawlers } from "@/data/brawlers";
import { UserStat } from "@/types/userStats";

interface BrawlerDetailsTableProps {
  stats: UserStat[];
}

export const BrawlerDetailsTable = ({ stats }: BrawlerDetailsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brawler Details</CardTitle>
        <CardDescription>Detailed statistics for your brawlers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brawler</TableHead>
              <TableHead>Games</TableHead>
              <TableHead>Victories</TableHead>
              <TableHead>Defeats</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead>Favorite Mode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats && stats.length > 0 ? (
              stats.map((stat) => {
                const brawler = brawlers.find(b => b.id === stat.brawler_id);
                const statWinRate = stat.games_played ? 
                  ((stat.victories || 0) / stat.games_played * 100).toFixed(1) : 
                  "0";
                
                return (
                  <TableRow key={stat.id}>
                    <TableCell className="font-medium">
                      {brawler?.name || `Brawler #${stat.brawler_id}`}
                    </TableCell>
                    <TableCell>{stat.games_played || 0}</TableCell>
                    <TableCell>{stat.victories || 0}</TableCell>
                    <TableCell>{stat.defeats || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {parseFloat(statWinRate) > 50 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        {statWinRate}%
                      </div>
                    </TableCell>
                    <TableCell>{stat.favorite_game_mode || "N/A"}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No data available. Start playing to see your stats!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
