
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { tips, getDefaultTips } from "../data/brawlers";

interface BrawlerTipsProps {
  brawler: string;
}

export const BrawlerTips: React.FC<BrawlerTipsProps> = ({ brawler }) => {
  // Verwende die vorhandenen Tipps oder Standardwerte für neue Brawler
  const brawlerTips = tips[brawler as keyof typeof tips] || getDefaultTips(brawler);

  return (
    <Card className="brawl-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brawl-blue" /> Pro Tips for {brawler}
        </CardTitle>
        <CardDescription>Expert advice to improve your gameplay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {brawlerTips.map((tip, idx) => (
            <div key={idx} className="flex gap-3 items-start p-4 border border-border rounded-lg bg-secondary">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brawl-blue/20 flex items-center justify-center">
                <span className="font-bold">{idx + 1}</span>
              </div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
