import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ResponsiveContainer,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Shield, 
  Swords, 
  Users, 
  MapPin, 
  Gauge, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp
} from "lucide-react";
import { Brawler } from "@/data/brawlers";
import { SynergyAnalysis } from "@/utils/synergyAnalysis";

interface AdvancedTeamAnalysisProps {
  selectedBrawlers: number[];
  brawlers: Brawler[];
  synergyData: SynergyAnalysis | null;
  gameMode: string;
}

// Game mode specific metrics
interface GameModeMetrics {
  gemCarrying: number;
  controlPotential: number;
  brawlBallSkill: number;
  bountySurvival: number;
  heistDamage: number;
  siegeDefense: number;
  hotZoneHold: number;
}

// Matchup data - represents how well the team performs against different team archetypes
interface MatchupData {
  archetype: string;
  winRate: number;
  counterStrategy: string;
}

export function AdvancedTeamAnalysis({ 
  selectedBrawlers, 
  brawlers, 
  synergyData, 
  gameMode 
}: AdvancedTeamAnalysisProps) {
  // Return early if we don't have enough data
  if (!synergyData || selectedBrawlers.length < 3) {
    return null;
  }

  const selectedBrawlerData = selectedBrawlers.map(id => 
    brawlers.find(b => b.id === id)!
  );
  
  // Compute game mode specific metrics based on brawler roles and stats
  const gameModeMetrics: GameModeMetrics = useMemo(() => {
    // Calculate base values from brawler stats
    const hasSupport = selectedBrawlerData.some(b => b.role === "Support");
    const hasTank = selectedBrawlerData.some(b => b.role === "Tank");
    const hasThrower = selectedBrawlerData.some(b => b.role === "Thrower");
    const hasController = selectedBrawlerData.some(b => b.role === "Controller");
    const hasMarksman = selectedBrawlerData.some(b => b.role === "Marksman");
    
    const avgHealth = selectedBrawlerData.reduce((sum, b) => sum + b.stats.health, 0) / selectedBrawlerData.length;
    const avgDamage = selectedBrawlerData.reduce((sum, b) => sum + b.stats.damage, 0) / selectedBrawlerData.length;
    
    // Calculate mode-specific metrics
    return {
      gemCarrying: hasSupport ? 85 : hasTank ? 70 : 60,
      controlPotential: (hasController || hasThrower) ? 90 : hasSupport ? 75 : 60,
      brawlBallSkill: hasTank ? 90 : hasController ? 75 : 65,
      bountySurvival: hasMarksman ? 85 : hasSupport ? 70 : 60,
      heistDamage: avgDamage > 1500 ? 90 : avgDamage > 1200 ? 75 : 65,
      siegeDefense: hasController ? 85 : hasThrower ? 80 : 70,
      hotZoneHold: (hasController && hasTank) ? 95 : hasController || hasTank ? 80 : 65
    };
  }, [selectedBrawlerData]);
  
  // Generate matchup data against common team archetypes
  const matchupData: MatchupData[] = useMemo(() => {
    const tankCount = selectedBrawlerData.filter(b => b.role === "Tank").length;
    const damageCount = selectedBrawlerData.filter(b => 
      b.role === "Damage Dealer" || b.role === "Marksman").length;
    const supportCount = selectedBrawlerData.filter(b => b.role === "Support").length;
    const controllerCount = selectedBrawlerData.filter(b => 
      b.role === "Controller" || b.role === "Thrower").length;
    
    // Calculate matchup win rates against common team archetypes
    return [
      {
        archetype: "Triple Tank",
        winRate: damageCount >= 2 ? 75 : damageCount === 1 ? 60 : 40,
        counterStrategy: "Use high-damage brawlers to break down their health quickly."
      },
      {
        archetype: "Aggro Rush",
        winRate: controllerCount >= 2 ? 80 : tankCount >= 1 ? 65 : 50,
        counterStrategy: "Keep your distance and use area denial abilities."
      },
      {
        archetype: "Long Range",
        winRate: tankCount >= 1 ? 70 : controllerCount >= 1 ? 60 : 45,
        counterStrategy: "Use walls for cover and close the distance quickly."
      },
      {
        archetype: "Controller Heavy",
        winRate: damageCount >= 2 ? 65 : tankCount >= 1 ? 55 : 45,
        counterStrategy: "Avoid choke points and push aggressively to disrupt their positioning."
      },
      {
        archetype: "Balanced Comp",
        winRate: (synergyData.overall.score > 80) ? 70 : (synergyData.overall.score > 70) ? 60 : 50,
        counterStrategy: "Capitalize on your team's strengths and target their weakest brawlers."
      }
    ];
  }, [selectedBrawlerData, synergyData]);
  
  // Chart data for mode-specific performance
  const modePerformanceData = useMemo(() => {
    switch(gameMode) {
      case "gemGrab":
        return [
          { metric: "Gem Carrying", value: gameModeMetrics.gemCarrying },
          { metric: "Map Control", value: gameModeMetrics.controlPotential },
          { metric: "Countdown Defense", value: synergyData.survivalPotential.score },
          { metric: "Team Wipe Potential", value: synergyData.damageOutput.score },
          { metric: "Recovery Ability", value: (synergyData.survivalPotential.score + gameModeMetrics.controlPotential) / 2 }
        ];
      case "brawlBall":
        return [
          { metric: "Ball Control", value: gameModeMetrics.brawlBallSkill },
          { metric: "Goal Defense", value: synergyData.controlAbility.score },
          { metric: "Scoring Potential", value: (gameModeMetrics.brawlBallSkill + synergyData.damageOutput.score) / 2 },
          { metric: "Lane Control", value: synergyData.rangeBalance.score },
          { metric: "Team Fights", value: (synergyData.damageOutput.score + synergyData.survivalPotential.score) / 2 }
        ];
      case "bounty":
        return [
          { metric: "Star Collection", value: synergyData.damageOutput.score },
          { metric: "Survival", value: gameModeMetrics.bountySurvival },
          { metric: "Kill Confirming", value: (synergyData.damageOutput.score + synergyData.rangeBalance.score) / 2 },
          { metric: "Target Protection", value: synergyData.controlAbility.score },
          { metric: "Map Awareness", value: synergyData.rangeBalance.score }
        ];
      case "heist":
        return [
          { metric: "Safe Damage", value: gameModeMetrics.heistDamage },
          { metric: "Safe Defense", value: synergyData.controlAbility.score },
          { metric: "Path Creation", value: synergyData.damageOutput.score },
          { metric: "Counter Push", value: (synergyData.controlAbility.score + synergyData.survivalPotential.score) / 2 },
          { metric: "Lane Dominance", value: synergyData.roleBalance.score }
        ];
      case "siege":
        return [
          { metric: "Bolt Collection", value: (synergyData.controlAbility.score + gameModeMetrics.controlPotential) / 2 },
          { metric: "IKE Defense", value: gameModeMetrics.siegeDefense },
          { metric: "Robot Support", value: (synergyData.damageOutput.score + synergyData.roleBalance.score) / 2 },
          { metric: "Enemy Defense", value: synergyData.controlAbility.score },
          { metric: "Comeback Potential", value: gameModeMetrics.siegeDefense }
        ];
      case "hotZone":
        return [
          { metric: "Zone Control", value: gameModeMetrics.hotZoneHold },
          { metric: "Zone Defense", value: synergyData.controlAbility.score },
          { metric: "Multi-Zone Splitting", value: synergyData.rangeBalance.score },
          { metric: "Team Sustain", value: synergyData.survivalPotential.score },
          { metric: "Counter Play", value: (synergyData.roleBalance.score + synergyData.damageOutput.score) / 2 }
        ];
      default:
        return [
          { metric: "Team Fighting", value: (synergyData.damageOutput.score + synergyData.survivalPotential.score) / 2 },
          { metric: "Map Control", value: synergyData.controlAbility.score },
          { metric: "Objective Focus", value: synergyData.roleBalance.score },
          { metric: "Versatility", value: synergyData.rangeBalance.score },
          { metric: "Overall Synergy", value: synergyData.overall.score }
        ];
    }
  }, [gameMode, gameModeMetrics, synergyData]);
  
  const radarChartData = useMemo(() => {
    return [
      {
        subject: "Damage",
        A: synergyData.damageOutput.score,
        fullMark: 100,
      },
      {
        subject: "Control",
        A: synergyData.controlAbility.score,
        fullMark: 100,
      },
      {
        subject: "Survival",
        A: synergyData.survivalPotential.score,
        fullMark: 100,
      },
      {
        subject: "Versatility",
        A: synergyData.rangeBalance.score,
        fullMark: 100,
      },
      {
        subject: "Team Comp",
        A: synergyData.roleBalance.score,
        fullMark: 100,
      },
      {
        subject: gameMode === "gemGrab" ? "Gem Carry" : 
                gameMode === "brawlBall" ? "Ball Control" :
                gameMode === "bounty" ? "Star Collect" :
                gameMode === "heist" ? "Safe Damage" :
                gameMode === "siege" ? "Bolt Control" :
                gameMode === "hotZone" ? "Zone Hold" : "Objective",
        A: Object.values(gameModeMetrics)[0],
        fullMark: 100,
      },
    ];
  }, [synergyData, gameMode, gameModeMetrics]);
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-lime-500";
    if (score >= 55) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-lime-500";
    if (score >= 55) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const teamStrengths = useMemo(() => {
    const strengths = [];
    
    if (synergyData.damageOutput.score >= 80) 
      strengths.push("High damage output potential");
    
    if (synergyData.survivalPotential.score >= 80) 
      strengths.push("Excellent team survivability");
    
    if (synergyData.controlAbility.score >= 80) 
      strengths.push("Strong area control capabilities");
    
    if (synergyData.rangeBalance.score >= 80) 
      strengths.push("Great range diversity and coverage");
    
    if (synergyData.roleBalance.score >= 80) 
      strengths.push("Excellent role balance and synergy");
    
    if (strengths.length === 0) {
      if (synergyData.overall.score >= 70)
        strengths.push("Solid all-around performance");
      else
        strengths.push("No outstanding strengths identified");
    }
    
    return strengths;
  }, [synergyData]);

  const teamWeaknesses = useMemo(() => {
    const weaknesses = [];
    
    if (synergyData.damageOutput.score < 65) 
      weaknesses.push("Low damage output potential");
    
    if (synergyData.survivalPotential.score < 65) 
      weaknesses.push("Vulnerable team composition");
    
    if (synergyData.controlAbility.score < 65) 
      weaknesses.push("Weak area control capabilities");
    
    if (synergyData.rangeBalance.score < 65) 
      weaknesses.push("Poor range diversity");
    
    if (synergyData.roleBalance.score < 65) 
      weaknesses.push("Unbalanced role distribution");
    
    if (weaknesses.length === 0) {
      weaknesses.push("No critical weaknesses identified");
    }
    
    return weaknesses;
  }, [synergyData]);

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-brawl-blue" /> Advanced Team Analysis
        </CardTitle>
        <CardDescription>
          In-depth analysis of your team's performance metrics and match-up potential
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="flex gap-2 items-center">
              <Gauge className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="matchups" className="flex gap-2 items-center">
              <Swords className="h-4 w-4" /> Matchups
            </TabsTrigger>
            <TabsTrigger value="mode" className="flex gap-2 items-center">
              <MapPin className="h-4 w-4" /> Mode Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex gap-2 items-center">
              <Target className="h-4 w-4" /> Improvement
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-brawl-blue" />
                    Team Composition Score
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <Badge className={`text-2xl py-3 px-4 ${getScoreBadgeColor(synergyData.overall.score)}`}>
                      {synergyData.overall.score}%
                    </Badge>
                  </div>
                  <p className={`text-center font-medium ${getScoreColor(synergyData.overall.score)}`}>
                    {synergyData.overall.comment}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    Team Strengths
                  </h3>
                  <ul className="space-y-2">
                    {teamStrengths.map((strength, index) => (
                      <li key={index} className="bg-muted p-2 px-3 rounded-md">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-orange-500" />
                    Team Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {teamWeaknesses.map((weakness, index) => (
                      <li key={index} className="bg-muted p-2 px-3 rounded-md">
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    A: {
                      label: "Team Performance",
                      theme: {
                        light: "rgba(124, 58, 237, 0.8)",
                        dark: "rgba(139, 92, 246, 0.8)",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={120} data={radarChartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                      <Radar
                        name="Team Performance"
                        dataKey="A"
                        stroke="var(--color-A)"
                        fill="var(--color-A)"
                        fillOpacity={0.6}
                      />
                      <ChartTooltip content={ChartTooltipContent} />
                    </RadarChart>
                  </ResponsiveContainer>
                  <ChartLegend content={ChartLegendContent} verticalAlign="top" />
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="matchups">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Predicted Matchup Win Rates</h3>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    winRate: {
                      label: "Win Rate %",
                      theme: {
                        light: "rgba(59, 130, 246, 0.8)",
                        dark: "rgba(96, 165, 250, 0.8)",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchupData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="archetype" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="winRate"
                        name="Win Rate"
                        fill="var(--color-winRate)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Counter Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchupData.map((match, index) => (
                    <div key={index} className="border border-border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{match.archetype}</h4>
                        <Badge className={getScoreBadgeColor(match.winRate)}>
                          {match.winRate}% Win Rate
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{match.counterStrategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mode">
            <h3 className="text-lg font-semibold mb-4">
              {gameMode === "gemGrab" ? "Gem Grab" : 
               gameMode === "brawlBall" ? "Brawl Ball" :
               gameMode === "bounty" ? "Bounty" :
               gameMode === "heist" ? "Heist" :
               gameMode === "siege" ? "Siege" :
               gameMode === "hotZone" ? "Hot Zone" : "Game Mode"} Performance Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Performance",
                      theme: {
                        light: "rgba(16, 185, 129, 0.8)",
                        dark: "rgba(5, 150, 105, 0.8)",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={modePerformanceData}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="metric" type="category" width={120} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="value"
                        name="Performance"
                        fill="var(--color-value)"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Mode-Specific Analysis</h4>
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  {gameMode === "gemGrab" && (
                    <>
                      <p>This team has {synergyData.overall.score >= 75 ? "strong" : "moderate"} gem carrying potential. 
                      {selectedBrawlerData.some(b => b.role === "Support") 
                        ? " Your support brawler should prioritize collecting gems while others provide protection." 
                        : " Consider having your tankiest brawler collect gems."}</p>
                      <p>Focus on {synergyData.controlAbility.score >= 75 ? "maintaining map control with your strong area denial" : "improving your positioning to maximize area control"}.</p>
                    </>
                  )}
                  
                  {gameMode === "brawlBall" && (
                    <>
                      <p>This team has {synergyData.damageOutput.score >= 75 ? "good" : "fair"} goal-scoring potential. 
                      {selectedBrawlerData.some(b => b.role === "Tank") 
                        ? " Your tank should lead ball pushes while damage dealers clear the path." 
                        : " Coordinate your attacks to clear defenders before making a push."}</p>
                      <p>{synergyData.controlAbility.score >= 75 ? "Use your strong area control abilities to lock down your goal area." : "Be cautious with defense as your area control is limited."}</p>
                    </>
                  )}
                  
                  {gameMode === "bounty" && (
                    <>
                      <p>This team has {synergyData.rangeBalance.score >= 75 ? "excellent" : "reasonable"} range coverage for Bounty. 
                      {synergyData.damageOutput.score >= 75 
                        ? " Prioritize eliminating enemies with high star counts." 
                        : " Focus on survival rather than aggressive plays."}</p>
                      <p>{synergyData.survivalPotential.score >= 75 ? "Your high survivability gives you an advantage in preserving stars." : "Be careful with positioning as your team may be vulnerable."}</p>
                    </>
                  )}
                  
                  {gameMode === "heist" && (
                    <>
                      <p>This team has {synergyData.damageOutput.score >= 75 ? "high" : "moderate"} safe damage potential. 
                      {selectedBrawlerData.some(b => b.stats.damage > 1500) 
                        ? " Your high-damage brawlers should focus on the safe when possible." 
                        : " You'll need coordinated attacks to damage the safe effectively."}</p>
                      <p>{synergyData.controlAbility.score >= 75 ? "Use your control abilities to defend your safe and create openings for offense." : "Be aggressive with your pushes as your defensive capabilities are limited."}</p>
                    </>
                  )}
                  
                  {gameMode === "siege" && (
                    <>
                      <p>This team has {synergyData.controlAbility.score >= 75 ? "strong" : "acceptable"} bolt collection potential. 
                      {selectedBrawlerData.some(b => b.role === "Controller" || b.role === "Thrower") 
                        ? " Use your area control to dominate the center and collect bolts." 
                        : " Try to pick off enemy bolt carriers when possible."}</p>
                      <p>{synergyData.survivalPotential.score >= 75 ? "Your defensive capabilities will help protect your IKE." : "Focus on offensive pushes as your defense may be weaker."}</p>
                    </>
                  )}
                  
                  {gameMode === "hotZone" && (
                    <>
                      <p>This team has {synergyData.controlAbility.score >= 75 ? "excellent" : "decent"} zone control capabilities. 
                      {selectedBrawlerData.some(b => b.role === "Tank" || b.role === "Controller") 
                        ? " Your tank/controller should anchor zones while others provide support." 
                        : " Rotate between zones and focus on team fights."}</p>
                      <p>{synergyData.survivalPotential.score >= 75 ? "Your team's sustainability allows for extended zone control." : "Take care not to overextend as your team may be vulnerable to coordinated attacks."}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brawl-blue" /> Strategic Recommendations
                </h3>
                
                <div className="bg-secondary p-4 rounded-lg space-y-3">
                  <h4 className="font-medium">Playing To Your Strengths</h4>
                  <ul className="space-y-2">
                    {synergyData.damageOutput.score >= 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-500">•</div>
                        <span>Leverage your high damage output for quick eliminations</span>
                      </li>
                    )}
                    
                    {synergyData.survivalPotential.score >= 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-500">•</div>
                        <span>Use your survivability to maintain map presence</span>
                      </li>
                    )}
                    
                    {synergyData.controlAbility.score >= 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-500">•</div>
                        <span>Control key map areas to restrict enemy movement</span>
                      </li>
                    )}
                    
                    {synergyData.rangeBalance.score >= 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-500">•</div>
                        <span>Utilize your range diversity to counter different enemies</span>
                      </li>
                    )}
                    
                    {synergyData.roleBalance.score >= 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-500">•</div>
                        <span>Coordinate your complementary roles for maximum efficiency</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg space-y-3">
                  <h4 className="font-medium">Addressing Weaknesses</h4>
                  <ul className="space-y-2">
                    {synergyData.damageOutput.score < 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-orange-500">•</div>
                        <span>Focus on strategic attacks to maximize your limited damage output</span>
                      </li>
                    )}
                    
                    {synergyData.survivalPotential.score < 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-orange-500">•</div>
                        <span>Play more defensively to compensate for vulnerability</span>
                      </li>
                    )}
                    
                    {synergyData.controlAbility.score < 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-orange-500">•</div>
                        <span>Group together to maximize your area control</span>
                      </li>
                    )}
                    
                    {synergyData.rangeBalance.score < 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-orange-500">•</div>
                        <span>Be mindful of map features that complement your range limitations</span>
                      </li>
                    )}
                    
                    {synergyData.roleBalance.score < 70 && (
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-orange-500">•</div>
                        <span>Adjust your playstyle to fill missing team roles</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-brawl-purple" /> Team Composition Tips
                </h3>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Ideal Brawler Swaps</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Consider these alternatives to improve your team composition:
                  </p>
                  
                  {synergyData.damageOutput.score < 70 && (
                    <div className="p-3 border border-border rounded-md mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">To increase damage output:</span>
                      </div>
                      <p className="text-sm">
                        Consider swapping your lowest damage brawler for a high-damage dealer like Colt, Brock, or Piper.
                      </p>
                    </div>
                  )}
                  
                  {synergyData.survivalPotential.score < 70 && (
                    <div className="p-3 border border-border rounded-md mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">To increase survivability:</span>
                      </div>
                      <p className="text-sm">
                        Add a tank like El Primo or Rosa, or a healer like Poco or Byron.
                      </p>
                    </div>
                  )}
                  
                  {synergyData.controlAbility.score < 70 && (
                    <div className="p-3 border border-border rounded-md mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">To increase area control:</span>
                      </div>
                      <p className="text-sm">
                        Add a controller like Barley, Sprout, or Gale for better zone control.
                      </p>
                    </div>
                  )}
                  
                  {synergyData.overall.score >= 80 && (
                    <div className="p-3 border border-border rounded-md mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Team looks great!</span>
                      </div>
                      <p className="text-sm">
                        This is already an excellent team composition. Focus on execution and coordination.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{gameMode === "gemGrab" ? "Gem Grab" : 
                                                   gameMode === "brawlBall" ? "Brawl Ball" :
                                                   gameMode === "bounty" ? "Bounty" :
                                                   gameMode === "heist" ? "Heist" :
                                                   gameMode === "siege" ? "Siege" :
                                                   gameMode === "hotZone" ? "Hot Zone" : 
                                                   "Game Mode"} Strategy Tips</h4>
                  
                  {gameMode === "gemGrab" && (
                    <div className="space-y-2">
                      <
