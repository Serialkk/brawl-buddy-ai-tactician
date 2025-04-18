
import React from "react";
import { FavoriteBrawlers } from "./FavoriteBrawlers";
import { BrawlerPerformanceChart } from "@/components/performance-tracking/BrawlerPerformanceChart";
import { UserStat } from "@/types/userStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart } from "lucide-react";

interface BrawlerStatsProps {
  stats: UserStat[];
}

export const BrawlerStats = ({ stats }: BrawlerStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brawler Statistics</CardTitle>
        <CardDescription>Performance data for your most played brawlers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="favorites" className="space-y-4">
          <TabsList>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Favorite Brawlers
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Performance Chart
            </TabsTrigger>
          </TabsList>
          <TabsContent value="favorites" className="space-y-4">
            <FavoriteBrawlers stats={stats} />
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <BrawlerPerformanceChart stats={stats} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
