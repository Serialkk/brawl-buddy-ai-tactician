
import { Button } from "@/components/ui/button";
import { ResultHeader } from "./ResultHeader";
import { StrengthsCard } from "./StrengthsCard";
import { WeaknessesCard } from "./WeaknessesCard";
import { PerformanceMetricsCard } from "./PerformanceMetricsCard";
import { generateAnalysisPDF } from "./utils/pdfUtils";
import { FilePdf, Download } from "lucide-react";
import { toast } from "sonner";

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
  const handleDownloadPDF = () => {
    try {
      generateAnalysisPDF(replayData);
      toast.success("PDF herunterladen erfolgreich");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("PDF-Erstellung fehlgeschlagen. Bitte versuchen Sie es später erneut.");
    }
  };

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

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button onClick={onReset} className="brawl-button brawl-button-primary">
          Analyze Another Replay
        </Button>
        
        <Button 
          onClick={handleDownloadPDF} 
          variant="outline" 
          className="border-brawl-blue text-brawl-blue hover:bg-brawl-blue/10"
        >
          <FilePdf className="mr-2 h-5 w-5" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
