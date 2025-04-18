
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TimeBasedStatsProps {
  data: Array<{
    date: string;
    winRate: number;
    accuracy: number;
  }>;
}

export function TimeBasedStats({ data }: TimeBasedStatsProps) {
  const chartConfig = {
    winRate: {
      label: "Win Rate",
      theme: {
        light: "#8B5CF6",
        dark: "#A78BFA",
      },
    },
    accuracy: {
      label: "Accuracy",
      theme: {
        light: "#EC4899",
        dark: "#F472B6",
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={ChartTooltipContent} />
              <Line
                type="monotone"
                dataKey="winRate"
                stroke="var(--color-winRate)"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-accuracy)"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
