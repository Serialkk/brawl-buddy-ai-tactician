
import React from "react";
import { PersonalStats } from "@/components/performance-tracking/PersonalStats";

export function RealTimeStats() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Performance Statistics</h2>
      </div>
      <div className="border-b pb-5">
        <p className="text-muted-foreground">
          Track your progress, analyze your performance, and improve your game.
        </p>
      </div>
      
      <PersonalStats />
    </div>
  );
}
