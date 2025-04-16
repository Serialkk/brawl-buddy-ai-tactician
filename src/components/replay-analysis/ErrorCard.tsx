
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorCardProps {
  onReset: () => void;
}

export function ErrorCard({ onReset }: ErrorCardProps) {
  return (
    <div className="brawl-card p-8 max-w-md mx-auto border border-destructive">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't analyze your replay. Please try again with a different file.
        </p>
        <Button onClick={onReset} className="brawl-button">
          Try Again
        </Button>
      </div>
    </div>
  );
}
