
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface ResultHeaderProps {
  brawlerUsed: string;
  gameMode: string;
  onReset: () => void;
}

export function ResultHeader({ brawlerUsed, gameMode, onReset }: ResultHeaderProps) {
  return (
    <div className="bg-muted/30 p-4 rounded-lg mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
            <OptimizedImage 
              src={`/brawlers/${brawlerUsed?.toLowerCase()}.png`} 
              alt={brawlerUsed || "Brawler"} 
              fallback="/placeholder.svg"
              className="h-10 w-10 object-contain" 
            />
          </div>
          <div>
            <h3 className="font-bold">{brawlerUsed || "Unknown Brawler"}</h3>
            <p className="text-sm text-muted-foreground">{gameMode || "Unknown Mode"}</p>
          </div>
        </div>
        <Button onClick={onReset} variant="outline" size="sm">
          Analyze Another Replay
        </Button>
      </div>
    </div>
  );
}
