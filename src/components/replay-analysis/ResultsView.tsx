
import { Button } from "@/components/ui/button";
import { ResultHeader } from "./ResultHeader";
import { StrengthsCard } from "./StrengthsCard";
import { WeaknessesCard } from "./WeaknessesCard";
import { PerformanceMetricsCard } from "./PerformanceMetricsCard";

interface ReplayData {
  brawlerUsed: string;
  gameMode: string;
  metrics: {
    accuracy: number;
    positioning: number;
    superUsage: number;
    mapControl: number;
  };
  strengths: string[];
  weaknesses: string[];
  timestamp: string;
}

interface ResultsViewProps {
  replayData: ReplayData;
  onReset: () => void;
}

export function ResultsView({ replayData, onReset }: ResultsViewProps) {
  return (
    <div className="space-y-6">
      <ResultHeader 
        brawlerUsed={replayData.brawlerUsed}
        gameMode={replayData.gameMode}
        onReset={onReset}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StrengthsCard strengths={replayData.strengths} />
        <WeaknessesCard weaknesses={replayData.weaknesses} />
      </div>
      
      <PerformanceMetricsCard metrics={replayData.metrics} />

      <div className="flex justify-center mt-8">
        <Button onClick={onReset} className="brawl-button brawl-button-primary">
          Analyze Another Replay
        </Button>
      </div>
    </div>
  );
}
