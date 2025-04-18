
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { abilities, getDefaultAbilities } from "../data/brawlers";

interface BrawlerAbilitiesProps {
  brawler: string;
}

export const BrawlerAbilities: React.FC<BrawlerAbilitiesProps> = ({ brawler }) => {
  // Verwende die vorhandenen Fähigkeitsdaten oder Standardwerte für neue Brawler
  const brawlerAbilities = abilities[brawler as keyof typeof abilities] || getDefaultAbilities(brawler);

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-brawl-yellow" /> {brawler}'s Abilities
        </CardTitle>
        <CardDescription>Master these abilities to dominate the arena</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {brawlerAbilities.map((ability, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-2xl font-bold">{ability.name.charAt(0)}</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{ability.name}</h3>
                  <Badge className={`
                    ${ability.type === "Basic" ? "bg-brawl-blue" : 
                      ability.type === "Super" ? "bg-brawl-yellow" : 
                      ability.type === "Gadget" ? "bg-brawl-purple" : "bg-brawl-red"}
                  `}>
                    {ability.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{ability.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
