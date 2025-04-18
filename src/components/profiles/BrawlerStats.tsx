
import React from "react";
import { FavoriteBrawlers } from "./FavoriteBrawlers";
import { BrawlerPerformanceChart } from "@/components/performance-tracking/BrawlerPerformanceChart";
import { UserStat } from "@/types/userStats";

interface BrawlerStatsProps {
  stats: UserStat[];
}

export const BrawlerStats = ({ stats }: BrawlerStatsProps) => {
  return (
    <div className="space-y-6">
      <FavoriteBrawlers stats={stats} />
      <BrawlerPerformanceChart stats={stats} />
    </div>
  );
};
