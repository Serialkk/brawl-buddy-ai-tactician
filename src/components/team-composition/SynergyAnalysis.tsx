
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from "recharts";
import { Users, Shield, Target, Zap, Radar as RadarIcon } from "lucide-react";
import { SynergyAnalysis as SynergyAnalysisType } from "@/utils/synergyAnalysis";
import { Brawler } from "@/data/brawlers";

interface SynergyAnalysisProps {
  selectedBrawlers: number[];
  brawlers: Brawler[];
  synergyData: SynergyAnalysisType | null;
}

export const SynergyAnalysis = ({ selectedBrawlers, brawlers, synergyData }: SynergyAnalysisProps) => {
  if (!synergyData || selectedBrawlers.length < 2) return null;

  const chartData = [
    { subject: "Roles", value: synergyData.roleBalance.score, fullMark: 100 },
    { subject: "Range", value: synergyData.rangeBalance.score, fullMark: 100 },
    { subject: "Damage", value: synergyData.damageOutput.score, fullMark: 100 },
    { subject: "Survival", value: synergyData.survivalPotential.score, fullMark: 100 },
    { subject: "Control", value: synergyData.controlAbility.score, fullMark: 100 },
  ];

  const getSynergyColorClass = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 75) return "text-green-400";
    if (score >= 65) return "text-lime-500";
    if (score >= 55) return "text-yellow-500";
    return "text-orange-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 75) return "bg-green-400";
    if (score >= 65) return "bg-lime-500";
    if (score >= 55) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brawl-blue" /> Team Synergy Analysis
        </CardTitle>
        <CardDescription>
          Analysis of how well your brawlers work together
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 space-y-6">
            <div className="flex flex-col gap-4 items-center justify-center p-4 bg-secondary rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Overall Synergy</h3>
                <div className="flex items-center justify-center">
                  <Badge className={`text-xl py-2 px-3 ${getProgressColor(synergyData.overall.score)}`}>
                    {synergyData.overall.score}%
                  </Badge>
                </div>
                <p className={`mt-2 font-medium ${synergyData.overall.color}`}>
                  {synergyData.overall.comment}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" /> 
                    <span className="font-medium">Role Balance</span>
                  </div>
                  <span className={getSynergyColorClass(synergyData.roleBalance.score)}>
                    {synergyData.roleBalance.score}%
                  </span>
                </div>
                <Progress value={synergyData.roleBalance.score} 
                  className={`h-2 ${getProgressColor(synergyData.roleBalance.score)}`} />
                <p className="text-xs text-muted-foreground mt-1">{synergyData.roleBalance.comment}</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-purple-500" /> 
                    <span className="font-medium">Range Coverage</span>
                  </div>
                  <span className={getSynergyColorClass(synergyData.rangeBalance.score)}>
                    {synergyData.rangeBalance.score}%
                  </span>
                </div>
                <Progress value={synergyData.rangeBalance.score} 
                  className={`h-2 ${getProgressColor(synergyData.rangeBalance.score)}`} />
                <p className="text-xs text-muted-foreground mt-1">{synergyData.rangeBalance.comment}</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" /> 
                    <span className="font-medium">Damage Output</span>
                  </div>
                  <span className={getSynergyColorClass(synergyData.damageOutput.score)}>
                    {synergyData.damageOutput.score}%
                  </span>
                </div>
                <Progress value={synergyData.damageOutput.score} 
                  className={`h-2 ${getProgressColor(synergyData.damageOutput.score)}`} />
                <p className="text-xs text-muted-foreground mt-1">{synergyData.damageOutput.comment}</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" /> 
                    <span className="font-medium">Survival Potential</span>
                  </div>
                  <span className={getSynergyColorClass(synergyData.survivalPotential.score)}>
                    {synergyData.survivalPotential.score}%
                  </span>
                </div>
                <Progress value={synergyData.survivalPotential.score} 
                  className={`h-2 ${getProgressColor(synergyData.survivalPotential.score)}`} />
                <p className="text-xs text-muted-foreground mt-1">{synergyData.survivalPotential.comment}</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <RadarIcon className="h-4 w-4 text-cyan-500" /> 
                    <span className="font-medium">Area Control</span>
                  </div>
                  <span className={getSynergyColorClass(synergyData.controlAbility.score)}>
                    {synergyData.controlAbility.score}%
                  </span>
                </div>
                <Progress value={synergyData.controlAbility.score} 
                  className={`h-2 ${getProgressColor(synergyData.controlAbility.score)}`} />
                <p className="text-xs text-muted-foreground mt-1">{synergyData.controlAbility.comment}</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="h-[300px]">
              {/* Fix: Wrapping the chart content in a Fragment to make it a single React element */}
              <ChartContainer
                config={{
                  synergy: {
                    label: "Team Synergy",
                    theme: {
                      light: "rgba(124, 58, 237, 0.8)",
                      dark: "rgba(139, 92, 246, 0.8)",
                    },
                  },
                }}
              >
                {/* The key fix here: Use a Fragment to group the children into a single element */}
                <>
                  <ResponsiveContainer>
                    <RadarChart outerRadius={90} data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                      <Radar
                        name="Team Synergy"
                        dataKey="value"
                        stroke="var(--color-synergy)"
                        fill="var(--color-synergy)"
                        fillOpacity={0.5}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RadarChart>
                  </ResponsiveContainer>
                  <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
                </>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
