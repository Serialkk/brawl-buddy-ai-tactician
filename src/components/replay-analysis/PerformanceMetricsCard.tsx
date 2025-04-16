
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceMetrics {
  accuracy: number;
  positioning: number;
  superUsage: number;
  mapControl: number;
}

interface PerformanceMetricsCardProps {
  metrics: PerformanceMetrics;
}

export function PerformanceMetricsCard({ metrics }: PerformanceMetricsCardProps) {
  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Key statistics from your match</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-muted-foreground text-sm">Accuracy</p>
            <p className="text-2xl font-bold text-brawl-blue">{metrics.accuracy}%</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-muted-foreground text-sm">Positioning</p>
            <p className="text-2xl font-bold text-brawl-yellow">{metrics.positioning}%</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-muted-foreground text-sm">Super Usage</p>
            <p className="text-2xl font-bold text-brawl-purple">{metrics.superUsage}%</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg text-center">
            <p className="text-muted-foreground text-sm">Map Control</p>
            <p className="text-2xl font-bold text-brawl-red">{metrics.mapControl}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
