
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Heart, Zap, Target, Shield } from "lucide-react";
import { Brawler } from "@/data/brawlers";

interface SelectedTeamDisplayProps {
  selectedBrawlers: number[];
  brawlers: Brawler[];
}

export const SelectedTeamDisplay = ({ selectedBrawlers, brawlers }: SelectedTeamDisplayProps) => {
  if (selectedBrawlers.length === 0) return null;

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brawl-blue" /> Your Selected Team
        </CardTitle>
        <CardDescription>
          Details of your selected brawlers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="abilities">Abilities</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedBrawlers.map(brawlerId => {
                const brawler = brawlers.find(b => b.id === brawlerId)!;
                return (
                  <div key={brawlerId} className="p-4 border border-border rounded-lg bg-secondary">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-3xl font-bold">{brawler.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{brawler.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{brawler.role}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>Health: {brawler.stats.health}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Damage: {brawler.stats.damage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span>Range: {brawler.stats.range}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Speed: {brawler.stats.speed}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="abilities">
            <div className="space-y-6">
              {selectedBrawlers.map(brawlerId => {
                const brawler = brawlers.find(b => b.id === brawlerId)!;
                return (
                  <div key={brawlerId} className="p-4 border border-border rounded-lg bg-secondary">
                    <h4 className="font-bold mb-3">{brawler.name}'s Abilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-card rounded-lg">
                        <Badge className="bg-blue-600 mb-2">Basic</Badge>
                        <h5 className="font-semibold mb-1">{brawler.abilities.basic}</h5>
                      </div>
                      <div className="p-3 bg-card rounded-lg">
                        <Badge className="bg-yellow-600 mb-2">Super</Badge>
                        <h5 className="font-semibold mb-1">{brawler.abilities.super}</h5>
                      </div>
                      <div className="p-3 bg-card rounded-lg">
                        <Badge className="bg-purple-600 mb-2">Gadget</Badge>
                        <h5 className="font-semibold mb-1">{brawler.abilities.gadget1}</h5>
                        {brawler.abilities.gadget2 && (
                          <h5 className="font-semibold mt-2 text-muted-foreground text-sm">{brawler.abilities.gadget2}</h5>
                        )}
                      </div>
                      <div className="p-3 bg-card rounded-lg md:col-span-3">
                        <Badge className="bg-green-600 mb-2">Star Power</Badge>
                        <div className="flex items-center gap-3 justify-between">
                          <h5 className="font-semibold">{brawler.abilities.starPower1}</h5>
                          {brawler.abilities.starPower2 && (
                            <h5 className="font-semibold text-muted-foreground">{brawler.abilities.starPower2}</h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Brawler</th>
                    <th className="text-center p-3">Health</th>
                    <th className="text-center p-3">Damage</th>
                    <th className="text-center p-3">Speed</th>
                    <th className="text-center p-3">Range</th>
                    <th className="text-center p-3">Role</th>
                    <th className="text-center p-3">Rarity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBrawlers.map(brawlerId => {
                    const brawler = brawlers.find(b => b.id === brawlerId)!;
                    return (
                      <tr key={brawlerId} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3 font-medium">{brawler.name}</td>
                        <td className="p-3 text-center">{brawler.stats.health}</td>
                        <td className="p-3 text-center">{brawler.stats.damage}</td>
                        <td className="p-3 text-center">{brawler.stats.speed}</td>
                        <td className="p-3 text-center">{brawler.stats.range}</td>
                        <td className="p-3 text-center">{brawler.role}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline">{brawler.rarity}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
