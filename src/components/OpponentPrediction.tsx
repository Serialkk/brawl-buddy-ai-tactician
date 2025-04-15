import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Shield, Users, ChevronRight, AlertCircle, Bot, Brain, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PredictionCardProps {
  title: string;
  probability: number;
  description: string;
  counters: string[];
}

const PredictionCard = ({ title, probability, description, counters }: PredictionCardProps) => (
  <Card className="brawl-card overflow-hidden">
    <div className={`h-2 ${
      probability > 75 ? "bg-red-500" : 
      probability > 50 ? "bg-yellow-500" : 
      "bg-green-500"
    }`} />
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Badge className={`
          ${probability > 75 ? "bg-red-500" : 
            probability > 50 ? "bg-yellow-500" : 
            "bg-green-500"
          }`}
        >
          {probability}%
        </Badge>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <h4 className="font-semibold text-sm flex items-center gap-1">
          <Shield className="h-4 w-4 text-brawl-blue" /> 
          Counter Strategies
        </h4>
        <ul className="space-y-2">
          {counters.map((counter, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{counter}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

export function OpponentPrediction() {
  const [enemyTeam, setEnemyTeam] = useState<string[]>(["Shelly", "Colt", "Jessie"]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [progress, setProgress] = useState(0);

  const strategies = [
    {
      title: "Aggressive Rush",
      probability: 85,
      description: "Expect early aggression with all three enemies pushing together to gain map control.",
      counters: [
        "Keep your distance and use area control abilities",
        "Set up defensive positions near your spawn",
        "Target their damage dealers first"
      ]
    },
    {
      title: "Split Push",
      probability: 65,
      description: "Enemies likely to divide their team with two pushing one lane and one flanking.",
      counters: [
        "Maintain good vision on flanking routes",
        "Use area denial abilities to block their advancement",
        "Group up quickly to eliminate isolated enemies"
      ]
    },
    {
      title: "Gem Hoarding",
      probability: 45,
      description: "A single player will collect most gems while others defend them.",
      counters: [
        "Focus on eliminating their gem carrier",
        "Use area control to separate their team",
        "Track the gem carrier's position at all times"
      ]
    },
  ];
  
  const patterns = [
    {
      title: "Super Chain",
      description: "They'll likely chain Supers to maximize effectiveness",
      counters: ["Keep your distance", "Spread out to avoid multi-hits", "Bait Supers in non-critical moments"]
    },
    {
      title: "Bush Camping",
      description: "Watch for ambushes from strategic bush positions",
      counters: ["Check bushes regularly", "Keep distance from suspicious areas", "Use wall-piercing attacks"]
    },
    {
      title: "Turret Defense",
      description: "Expect defensive turret placement in choke points",
      counters: ["Focus turrets first", "Use area damage to destroy them", "Flank around defended areas"]
    }
  ];

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setAnalysisComplete(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalysisComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const randomizeTeam = () => {
    const brawlers = ["Shelly", "Colt", "Brock", "Bull", "Jessie", "Nita", "Dynamike", "El Primo", "Barley", "Poco", "Rosa", "Rico"];
    const shuffled = [...brawlers].sort(() => 0.5 - Math.random());
    setEnemyTeam(shuffled.slice(0, 3));
    setAnalysisComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Opponent Prediction
        </h1>
        <p className="text-muted-foreground">
          Anticipate enemy strategies and learn how to counter them with AI-powered analysis.
        </p>
      </div>
      
      <Card className="brawl-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brawl-blue" /> Enemy Team
          </CardTitle>
          <CardDescription>Analysis based on the enemy team composition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {enemyTeam.map((brawler, idx) => (
                <div key={idx} className="px-4 py-2 bg-secondary rounded-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-bold">{brawler.charAt(0)}</span>
                  </div>
                  <span>{brawler}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <Button onClick={randomizeTeam} variant="outline" className="whitespace-nowrap">
                Random Team
              </Button>
              <Button 
                onClick={simulateAnalysis} 
                disabled={analyzing} 
                className="brawl-button brawl-button-primary whitespace-nowrap"
              >
                <Bot className="mr-2 h-4 w-4" />
                Analyze Team
              </Button>
            </div>
          </div>
          
          {analyzing && (
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-brawl-purple animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analyzing Opponent Patterns</h3>
              <p className="text-muted-foreground mb-4">Processing team composition and historical data...</p>
              <div className="w-full max-w-md mx-auto mb-2">
                <Progress value={progress} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">{progress}% Complete</p>
            </div>
          )}
          
          {!analyzing && !analysisComplete && (
            <div className="text-center p-8">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Analysis Available</h3>
              <p className="text-muted-foreground mb-4">
                Click "Analyze Team" to generate predictions based on the enemy composition.
              </p>
            </div>
          )}
          
          {analysisComplete && (
            <Tabs defaultValue="strategies" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="strategies" className="flex gap-2 items-center">
                  <Target className="h-4 w-4" /> Predicted Strategies
                </TabsTrigger>
                <TabsTrigger value="patterns" className="flex gap-2 items-center">
                  <Lightbulb className="h-4 w-4" /> Behavioral Patterns
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="strategies">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {strategies.map((strategy, idx) => (
                    <PredictionCard
                      key={idx}
                      title={strategy.title}
                      probability={strategy.probability}
                      description={strategy.description}
                      counters={strategy.counters}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="patterns">
                <div className="space-y-6">
                  {patterns.map((pattern, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg bg-secondary">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-brawl-yellow" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{pattern.title}</h3>
                          <p className="text-muted-foreground mb-4">{pattern.description}</p>
                          
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Shield className="h-4 w-4 text-brawl-blue" /> How to Counter:
                          </h4>
                          <ul className="space-y-1">
                            {pattern.counters.map((counter, counterIdx) => (
                              <li key={counterIdx} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <span className="text-sm">{counter}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default OpponentPrediction;
