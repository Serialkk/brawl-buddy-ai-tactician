
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ChartContainer, ChartLegend, ChartTooltipContent } from "@/components/ui/chart";

interface AdvancedMetricsProps {
  metrics: {
    accuracy: number;
    positioning: number;
    superUsage: number;
    mapControl: number;
    teamwork: number;
    objectiveControl: number;
  };
}

export function AdvancedMetrics({ metrics }: AdvancedMetricsProps) {
  const data = [
    { subject: 'Accuracy', A: metrics.accuracy },
    { subject: 'Positioning', A: metrics.positioning },
    { subject: 'Super Usage', A: metrics.superUsage },
    { subject: 'Map Control', A: metrics.mapControl },
    { subject: 'Teamwork', A: metrics.teamwork },
    { subject: 'Objective Control', A: metrics.objectiveControl },
  ];

  const chartConfig = {
    playerStats: {
      label: "Performance",
      theme: {
        light: "#8B5CF6",
        dark: "#A78BFA",
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Tooltip content={<ChartTooltipContent />} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="var(--color-playerStats)"
                fill="var(--color-playerStats)"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
          <ChartLegend content={ChartLegendContent} />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const ChartLegendContent = ({ payload }: { payload?: any[] }) => (
  <div className="flex justify-center gap-4 py-2">
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-[var(--color-playerStats)]" />
      <span className="text-sm text-muted-foreground">Your Performance</span>
    </div>
  </div>
);
