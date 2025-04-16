
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface WeaknessesCardProps {
  weaknesses: string[];
}

export function WeaknessesCard({ weaknesses }: WeaknessesCardProps) {
  return (
    <Card className="brawl-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-brawl-red" /> 
          Areas to Improve
        </CardTitle>
        <CardDescription>Focus on these aspects to get better</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {weaknesses.map((weakness: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <div className="min-w-5 min-h-5 mt-0.5 rounded-full bg-brawl-red/20 flex items-center justify-center">
                <AlertCircle className="h-3 w-3 text-brawl-red" />
              </div>
              <span>{weakness}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
