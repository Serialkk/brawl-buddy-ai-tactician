
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface StrengthsCardProps {
  strengths: string[];
}

export function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
    <Card className="brawl-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" /> 
          Strengths
        </CardTitle>
        <CardDescription>What you did well in this match</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {strengths.map((strength: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
