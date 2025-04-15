
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Map, Crosshair, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrawlerAbilities } from "./tabs/BrawlerAbilities";
import { BrawlerTips } from "./tabs/BrawlerTips";
import { BrawlerPositioning } from "./tabs/BrawlerPositioning";
import { BrawlerMatchups } from "./tabs/BrawlerMatchups";
import { brawlers } from "./data/brawlers";

export function StrategyGuide() {
  const [selectedBrawler, setSelectedBrawler] = useState("Shelly");

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brawl-blue to-brawl-purple">
          Strategy Guide
        </h1>
        <p className="text-muted-foreground">
          Master your favorite Brawlers with personalized tips and strategies.
        </p>
      </div>
      
      <Card className="brawl-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brawl-blue" /> Brawler Selection
          </CardTitle>
          <CardDescription>Choose a Brawler to see detailed strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {brawlers.map(brawler => (
              <Button
                key={brawler}
                variant={selectedBrawler === brawler ? "default" : "outline"}
                className={selectedBrawler === brawler ? "bg-brawl-purple hover:bg-brawl-purple/90" : ""}
                onClick={() => setSelectedBrawler(brawler)}
              >
                {brawler}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedBrawler && (
        <Tabs defaultValue="abilities" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="abilities" className="flex gap-2 items-center">
              <Zap className="h-4 w-4" /> Abilities
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex gap-2 items-center">
              <BookOpen className="h-4 w-4" /> Pro Tips
            </TabsTrigger>
            <TabsTrigger value="positioning" className="flex gap-2 items-center">
              <Map className="h-4 w-4" /> Positioning
            </TabsTrigger>
            <TabsTrigger value="matchups" className="flex gap-2 items-center">
              <Crosshair className="h-4 w-4" /> Matchups
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="abilities">
            <BrawlerAbilities brawler={selectedBrawler} />
          </TabsContent>
          
          <TabsContent value="tips">
            <BrawlerTips brawler={selectedBrawler} />
          </TabsContent>
          
          <TabsContent value="positioning">
            <BrawlerPositioning brawler={selectedBrawler} />
          </TabsContent>
          
          <TabsContent value="matchups">
            <BrawlerMatchups brawler={selectedBrawler} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
