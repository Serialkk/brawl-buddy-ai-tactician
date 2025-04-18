
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDown, ArrowUp, Sparkles, Wrench } from "lucide-react";

interface BalanceChange {
  brawler: string;
  type: "buff" | "nerf" | "rework";
  description: string;
}

interface PatchNote {
  version: string;
  date: string;
  changes: BalanceChange[];
  highlights: string[];
}

interface PatchNoteSummaryProps {
  patchNote: PatchNote;
}

export const PatchNoteSummary = ({ patchNote }: PatchNoteSummaryProps) => {
  const getChangeIcon = (type: "buff" | "nerf" | "rework") => {
    switch (type) {
      case "buff":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "nerf":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "rework":
        return <Wrench className="h-4 w-4 text-blue-500" />;
    }
  };

  const getChangeBadgeColor = (type: "buff" | "nerf" | "rework") => {
    switch (type) {
      case "buff":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "nerf":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "rework":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    }
  };

  return (
    <Card className="brawl-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brawl-yellow" />
              Patch {patchNote.version}
            </CardTitle>
            <CardDescription>{patchNote.date}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Meta Highlights */}
            <div>
              <h3 className="font-semibold mb-3">Meta Highlights</h3>
              <div className="space-y-2">
                {patchNote.highlights.map((highlight, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {highlight}
                  </p>
                ))}
              </div>
            </div>

            {/* Balance Changes */}
            <div>
              <h3 className="font-semibold mb-3">Balance Changes</h3>
              <div className="space-y-3">
                {patchNote.changes.map((change, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card"
                  >
                    <Badge
                      variant="outline"
                      className={getChangeBadgeColor(change.type)}
                    >
                      <span className="flex items-center gap-1">
                        {getChangeIcon(change.type)}
                        {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                      </span>
                    </Badge>
                    <div>
                      <p className="font-medium">{change.brawler}</p>
                      <p className="text-sm text-muted-foreground">
                        {change.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
